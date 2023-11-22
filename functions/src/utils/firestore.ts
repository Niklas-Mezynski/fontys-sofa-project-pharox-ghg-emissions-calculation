import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Filter,
  QuerySnapshot,
  getFirestore,
} from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { v4 as uuid } from "uuid";
import { UnknownObject } from "./types";

initializeApp();
export const db = getFirestore();

/* CREATE METHODS*/

/**
 * Function to create a document in a collection
 * @param {string} collectionName - The name of the collection to add data to
 * @param {UnknownObject} data - The data to be added
 * @returns {Promise<UnknownObject | undefined>} - The the created document object with the ID field
 */
export async function create(
  collectionName: string,
  data: UnknownObject
): Promise<UnknownObject | undefined> {
  const dataToSave = stripIdFromData(data);
  const docRef = await db.collection(collectionName).add(dataToSave);
  const documentSnapshot =
    await getDocumentSnaphsotFromDocumentReference(docRef);

  return getDataWithIdFromDocumentSnapshot(documentSnapshot);
}

/**
 * Function to create a document in a collection using a custom id
 * @param {string} collectionName - The name of the collection to add data to
 * @param {UnknownObject} data - The data to be added
 * @param {string} id - The id of the document to be created
 * @returns {Promise<UnknownObject | undefined>} - The the created document object with the ID field
 */
export async function createWithCustomId(
  collectionName: string,
  data: UnknownObject,
  id: string = uuid()
): Promise<UnknownObject | undefined> {
  const dataToSave = stripIdFromData(data);
  const docRef = db.collection(collectionName).doc(id);
  await docRef.set(dataToSave);

  const documentSnapshot =
    await getDocumentSnaphsotFromDocumentReference(docRef);
  return getDataWithIdFromDocumentSnapshot(documentSnapshot);
}

/**
 * Function to create multiple documents in a collection
 * @param {string} collectionName - The name of the collection to add data to
 * @param {UnknownObject[]} data - Array of data to be added
 * @returns {Promise<UnknownObject>} - Array of the created documents with their IDs
 */
export async function createMany(
  collectionName: string,
  data: UnknownObject[]
): Promise<UnknownObject[]> {
  const docsRef = [];
  const batch = db.batch();

  for (const item of data) {
    const dataToSave = stripIdFromData(item);
    const docRef = db.collection(collectionName).doc();
    batch.set(docRef, dataToSave);

    docsRef.push(docRef);
  }

  await batch.commit();

  const savedData = [];

  for (const docRef of docsRef) {
    const documentSnapshot =
      await getDocumentSnaphsotFromDocumentReference(docRef);

    // Data will be present since we have the batch commit operation, therefore casted to UnknownObject
    savedData.push(
      getDataWithIdFromDocumentSnapshot(documentSnapshot) as UnknownObject
    );
  }

  return savedData;
}

/**
 * Function to create multiple documents in a collection using custom ids
 * @param {string} collectionName - The name of the collection to add data to
 * @param {UnknownObject[]} data - Array of data to be added
 * @returns {Promise<UnknownObject[]>} - Array of the created documents with their IDs
 */
export async function createManyWithCustomId(
  collectionName: string,
  data: UnknownObject[]
): Promise<UnknownObject[]> {
  const docsRef = [];
  const batch = db.batch();

  for (const item of data) {
    const dataToSave = stripIdFromData(item);
    const id = (typeof item.id === "string" ? item.id : null) || uuid();
    const docRef = db.collection(collectionName).doc(id);
    batch.set(docRef, dataToSave);

    docsRef.push(docRef);
  }

  await batch.commit();

  const savedData = [];

  for (const docRef of docsRef) {
    const documentSnapshot =
      await getDocumentSnaphsotFromDocumentReference(docRef);

    // Data will be present since we have the batch commit operation, therefore casted to UnknownObject
    savedData.push(
      getDataWithIdFromDocumentSnapshot(documentSnapshot) as UnknownObject
    );
  }

  return savedData;
}

/* READ METHODS */

/**
 * Function to get all documents from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @returns {UnknownObject[]} - The documents in the collection with their IDs
 */
export async function getAll(collectionName: string): Promise<UnknownObject[]> {
  const result = await db.collection(collectionName).get();
  return getDataWithIdFromQuerySnapshot(result);
}

/**
 * Function to get a document by id from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @param {string} id - The id of the document to get
 * @returns {Promise<UnknownObject | undefined>} - The fetched document in the collection with its ID
 */
export async function getById(
  collectionName: string,
  id: string
): Promise<UnknownObject | undefined> {
  const result = await db.collection(collectionName).doc(id).get();
  return getDataWithIdFromDocumentSnapshot(result);
}

/**
 * Function to get multiple documents by filter from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @param {Filter} filter - The filter to apply
 * @returns {Promise<UnknownObject[]>} - The query snapshot
 */
export async function getByFilter(
  collectionName: string,
  filter: Filter
): Promise<UnknownObject[]> {
  const result = await db.collection(collectionName).where(filter).get();
  return getDataWithIdFromQuerySnapshot(result);
}

/* UPDATE METHODS */

/**
 * Function to update a document by id from a collection
 * @param {string} collectionName - The name of the collection to update data from
 * @param {string} id - The id of the document to update
 * @param {UnknownObject} data - The data to be updated
 * @returns {Promise<UnknownObject | undefined>} - The updated document in the collection with its ID, if succeded
 */
export async function updateById(
  collectionName: string,
  id: string,
  data: UnknownObject
): Promise<UnknownObject | undefined> {
  const dataToUpdate = stripIdFromData(data);

  const docRef = db.collection(collectionName).doc(id);
  await docRef.update(dataToUpdate);

  const documentSnapshot =
    await getDocumentSnaphsotFromDocumentReference(docRef);
  return getDataWithIdFromDocumentSnapshot(documentSnapshot);
}

/* DELETE METHODS */

/**
 * Function to delete a document by id from a collection
 * @param {string} collectionName - The name of the collection to delete data from
 * @param {string} id - The id of the document to delete
 */
export async function deleteById(
  collectionName: string,
  id: string
): Promise<void> {
  await db.collection(collectionName).doc(id).delete();
}

/**
 * Function to delete multiple documents by filter from a collection
 * @param {string} collectionName - The name of the collection to delete data from
 * @param {Filter} filter - The filter to apply
 */
export async function deleteByFilter(
  collectionName: string,
  filter: Filter
): Promise<void> {
  const snapshot = await db.collection(collectionName).where(filter).get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

/* HELPER METHODS */

/**
 * Helper method to merge data with an id
 * @param {UnknownObject} data - The data to be merged
 * @param {string} id - The id to be merged
 * @returns {UnknownObject} - The merged data with id
 */
function mergeDataWithId(data: object, id: string): UnknownObject {
  return Object.assign(data, { id });
}

/**
 * Helper method to strip the id field from data
 * @param {UnknownObject} data - The data
 * @returns {UnknownObject} - The data with without the id field
 */
function stripIdFromData(data: UnknownObject): UnknownObject {
  if (data.id) {
    delete data.id;
  }
  return data;
}

/**
 * Helper method to get the document data from a document reference
 * @param {DocumentReference<DocumentData>} docRef - The document reference
 * @returns {DocumentSnapshot<DocumentData>} - The document snapshot
 */
async function getDocumentSnaphsotFromDocumentReference(
  docRef: DocumentReference<DocumentData>
): Promise<DocumentSnapshot<DocumentData>> {
  return await docRef.get();
}

/**
 * Helper method to get the data from a document snapshot
 * @param {DocumentSnapshot<DocumentData>} doc - The document snapshot
 * @returns {UnknownObject | undefined} - The data of the document if present
 */
function getDataWithIdFromDocumentSnapshot(
  doc: DocumentSnapshot<DocumentData>
): UnknownObject | undefined {
  return isDocumentDataPresent(doc)
    ? mergeDataWithId(doc.data() as UnknownObject, doc.id)
    : undefined;
}

/**
 * Helper methods to check if a document snapshot has data
 * @param {DocumentSnapshot<DocumentData>} doc - The document snapshot
 * @returns {boolean} - Whether the document snapshot has data
 */
function isDocumentDataPresent(doc: DocumentSnapshot<DocumentData>): boolean {
  return doc.exists;
}

/**
 * Helper method to get all the data from a query snapshot
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {UnknownObject[]} - All the data in the query snapshot with their Ids
 */
function getDataWithIdFromQuerySnapshot(
  querySnapshot: QuerySnapshot<DocumentData>
): UnknownObject[] {
  return !isQuerySnapshotEmpty(querySnapshot)
    ? querySnapshot.docs.map((doc) => mergeDataWithId(doc.data(), doc.id))
    : [];
}

/**
 * Helper method to check if a query snapshot is empty
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {boolean} - Whether the query snapshot is empty
 */
function isQuerySnapshotEmpty(querySnapshot: QuerySnapshot<DocumentData>) {
  return querySnapshot.empty;
}

export * as FirestoreUtil from "./firestore";
