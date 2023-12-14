/* istanbul ignore file */
import { initializeApp } from "firebase-admin/app";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Filter,
  QuerySnapshot,
  getFirestore,
} from "firebase-admin/firestore";
import { v4 as uuid } from "uuid";
import { UnknownObject } from "./types";
import { HttpStatusCode } from "axios";
import { CustomError } from "./errors";

initializeApp();
export const db = getFirestore();

/* CREATE METHODS*/

/**
 * Function to create a document in a collection
 * @param {string} collectionName - The name of the collection to add data to
 * @param {E} data - The data to be added
 * @returns {Promise<E | undefined>} - The the created document object with the ID field
 */
export async function create<E extends UnknownObject>(
  collectionName: string,
  data: E
): Promise<E | undefined> {
  const dataToSave = stripIdFromData(data);
  const docRef = await db.collection(collectionName).add(dataToSave);
  const documentSnapshot =
    await getDocumentSnaphsotFromDocumentReference(docRef);

  return getDataWithIdFromDocumentSnapshot<E>(documentSnapshot);
}

/**
 * Function to create a document in a collection using a custom id
 * @param {string} collectionName - The name of the collection to add data to
 * @param {UnknownObject} data - The data to be added
 * @param {string} id - The id of the document to be created
 * @returns {Promise<UnknownObject | undefined>} - The the created document object with the ID field
 */
export async function createWithCustomId<E extends UnknownObject>(
  collectionName: string,
  data: E,
  id: string = uuid()
): Promise<E | undefined> {
  const dataToSave = stripIdFromData(data);
  const docRef = db.collection(collectionName).doc(id);
  await docRef.set(dataToSave);

  const documentSnapshot =
    await getDocumentSnaphsotFromDocumentReference(docRef);
  return getDataWithIdFromDocumentSnapshot<E>(documentSnapshot);
}

/**
 * Function to create multiple documents in a collection
 * @param {string} collectionName - The name of the collection to add data to
 * @param {E[]} data - Array of data to be added
 * @returns {Promise<E[]>} - Array of the created documents with their IDs
 */
export async function createMany<E extends UnknownObject>(
  collectionName: string,
  data: E[]
): Promise<E[]> {
  const docsRef = [];
  const batch = db.batch();

  for (const item of data) {
    const dataToSave = stripIdFromData(item);
    const docRef = db.collection(collectionName).doc();
    batch.set(docRef, dataToSave);

    docsRef.push(docRef);
  }

  await batch.commit();

  const savedData: E[] = [];

  for (const docRef of docsRef) {
    const documentSnapshot =
      await getDocumentSnaphsotFromDocumentReference(docRef);

    // Data will be present since we have the batch commit operation, therefore casted to UnknownObject
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    savedData.push(getDataWithIdFromDocumentSnapshot<E>(documentSnapshot)!);
  }

  return savedData;
}

/**
 * Function to create multiple documents in a collection using custom ids
 * @param {string} collectionName - The name of the collection to add data to
 * @param {E[]} data - Array of data to be added
 * @returns {Promise<E[]>} - Array of the created documents with their IDs
 */
export async function createManyWithCustomId<E extends UnknownObject>(
  collectionName: string,
  data: E[]
): Promise<E[]> {
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    savedData.push(getDataWithIdFromDocumentSnapshot<E>(documentSnapshot)!);
  }

  return savedData;
}

/* READ METHODS */

/**
 * Function to get all documents from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @returns {E[]} - The documents in the collection with their IDs
 */
export async function getAll<E extends UnknownObject>(
  collectionName: string
): Promise<E[]> {
  const result = await db.collection(collectionName).get();
  return getDataWithIdFromQuerySnapshot<E>(result);
}

/**
 * Function to get a document by id from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @param {string} id - The id of the document to get
 * @returns {Promise<E | undefined>} - The fetched document in the collection with its ID
 */
export async function getById<E extends UnknownObject>(
  collectionName: string,
  id: string
): Promise<E | undefined> {
  const result = await db.collection(collectionName).doc(id).get();
  return getDataWithIdFromDocumentSnapshot<E>(result);
}

/**
 * Function to get multiple documents by filter from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @param {Filter} filter - The filter to apply
 * @returns {Promise<E[]>} - The query snapshot
 */
export async function getByFilter<E extends UnknownObject>(
  collectionName: string,
  filter: Filter
): Promise<E[]> {
  const result = await db.collection(collectionName).where(filter).get();
  return getDataWithIdFromQuerySnapshot<E>(result);
}

/* UPDATE METHODS */

/**
 * Function to update a document by id from a collection
 * @param {string} collectionName - The name of the collection to update data from
 * @param {string} id - The id of the document to update
 * @param {E} data - The data to be updated
 * @returns {Promise<E | undefined>} - The updated document in the collection with its ID, if succeded
 */
export async function updateById<E extends UnknownObject>(
  collectionName: string,
  id: string,
  data: E
): Promise<E | undefined> {
  const dataToUpdate = stripIdFromData(data);

  const docRef = db.collection(collectionName).doc(id);
  try {
    await docRef.update(dataToUpdate);

    const documentSnapshot =
      await getDocumentSnaphsotFromDocumentReference(docRef);
    return getDataWithIdFromDocumentSnapshot<E>(documentSnapshot);
  } catch (error) {
    throw new CustomError({
      status: HttpStatusCode.NotFound,
      message: "Invalid update data provided or document to update not found.",
    });
  }
}

/* DELETE METHODS */

/**
 * Function to delete a document by id from a collection
 * @param {string} collectionName - The name of the collection to delete data from
 * @param {string} id - The id of the document to delete
 */
export async function deleteById(collectionName: string, id: string) {
  await db.collection(collectionName).doc(id).delete();
}

/**
 * Function to delete multiple documents by filter from a collection
 * @param {string} collectionName - The name of the collection to delete data from
 * @param {Filter} filter - The filter to apply
 */
export async function deleteByFilter(collectionName: string, filter: Filter) {
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
 * @param {E} data - The data to be merged
 * @param {string} id - The id to be merged
 * @returns {E} - The merged data with id
 */
function mergeDataWithId<E extends UnknownObject>(data: E, id: string): E {
  return Object.assign(data, { id });
}

/**
 * Helper method to strip the id field from data
 * @param {E} data - The data
 * @returns {E} - The data with without the id field
 */
function stripIdFromData<E extends UnknownObject>(data: E): E {
  if (data.id) {
    delete data.id;
  }
  return data;
}

/**
 * Helper method to get the document data from a document reference
 * @param {DocumentReference<DocumentData>} docRef - The document reference
 * @returns {Promise<DocumentSnapshot<DocumentData>>} - The document snapshot
 */
async function getDocumentSnaphsotFromDocumentReference(
  docRef: DocumentReference<DocumentData>
): Promise<DocumentSnapshot<DocumentData>> {
  return await docRef.get();
}

/**
 * Helper method to get the data from a document snapshot
 * @param {DocumentSnapshot<DocumentData>} doc - The document snapshot
 * @returns {E | undefined} - The data of the document if present
 */
function getDataWithIdFromDocumentSnapshot<E extends UnknownObject>(
  doc: DocumentSnapshot<DocumentData>
): E | undefined {
  return isDocumentDataPresent(doc)
    ? mergeDataWithId<E>(doc.data() as E, doc.id)
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
 * @returns {E[]} - All the data in the query snapshot with their Ids
 */
function getDataWithIdFromQuerySnapshot<E extends UnknownObject>(
  querySnapshot: QuerySnapshot<DocumentData>
): E[] {
  return !isQuerySnapshotEmpty(querySnapshot)
    ? querySnapshot.docs.map((doc) => mergeDataWithId(doc.data() as E, doc.id))
    : [];
}

/**
 * Helper method to check if a query snapshot is empty
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {boolean} - Whether the query snapshot is empty
 */
function isQuerySnapshotEmpty(
  querySnapshot: QuerySnapshot<DocumentData>
): boolean {
  return querySnapshot.empty;
}

export * as FirestoreUtil from "./firestore";
