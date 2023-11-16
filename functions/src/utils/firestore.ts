
import { CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, Filter, QueryDocumentSnapshot, QuerySnapshot, getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { v4 as uuid } from "uuid";

initializeApp();
export const db = getFirestore();

/* CREATE METHODS*/

/**
 * Function to create a document in a collection
 * @param {string} collectionName - The name of the collection to add data to
 * @param {any} data - The data to be added
 * @returns {Promise<DocumentReference<DocumentData>>} - The document reference of the created document
 */
export async function create(collectionName: string, data: any): Promise<DocumentReference<DocumentData>> {
  return await db.collection(collectionName).add(data);
}

/**
 * Function to create a document in a collection using a custom id
 * @param {string} collectionName - The name of the collection to add data to
 * @param {any} data - The data to be added
 * @param {string} id - The id of the document to be created
 * @returns {Promise<DocumentReference<DocumentData>>} - The document reference of the created document
 */
export async function createWithCustomId(collectionName: string, data: any, id: string = uuid() ): Promise<DocumentReference<DocumentData>> {
  await db.collection(collectionName).doc(id).set(data);
  return db.collection(collectionName).doc(id);
}

/**
 * Function to create multiple documents in a collection
 * @param {string} collectionName - The name of the collection to add data to
 * @param {any[]} data - Array of data to be added
 * @returns {Promise<DocumentReference<DocumentData>[]>} - Array of document references of the created documents
 */
export async function createMany(collectionName: string, data: any[]): Promise<DocumentReference<DocumentData>[]> {
  const docsRef = [];
  const batch = db.batch();

  for (const item of data) {
    const docRef = db.collection(collectionName).doc();
    batch.set(docRef, item);

    docsRef.push(docRef);
  }

  await batch.commit();

  return docsRef;
}

/**
 * Function to create multiple documents in a collection using custom ids
 * @param {string} collectionName - The name of the collection to add data to
 * @param {any[]} data - Array of data to be added
 * @returns {Promise<DocumentReference<DocumentData>[]>} - Array of document references of the created documents
 */
export async function createManyWithCustomId(collectionName: string, data: any[]): Promise<DocumentReference<DocumentData>[]> {
  const docsRef = [];
  const batch = db.batch();

  for (const item of data) {
    const id = item.id || uuid();
    const docRef = db.collection(collectionName).doc(id);
    batch.set(docRef, item);

    docsRef.push(docRef);
  }

  await batch.commit();

  return docsRef;
}


/* READ METHODS */

/**
 * Function to get all documents from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @returns
 */
export async function getAll(collectionName: string): Promise<QuerySnapshot<any>> {
  return await db.collection(collectionName).get();
}

/**
 * Function to get a document by id from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @param {string} id - The id of the document to get
 * @returns {Promise<DocumentSnapshot<DocumentData>>} - The document snapshot
 */
export async function getById(collectionName: string, id: string): Promise<DocumentSnapshot<DocumentData>> {
  return await db.collection(collectionName).doc(id).get();
}

/**
 * Function to get multiple documents by filter from a collection
 * @param {string} collectionName - The name of the collection to get data from
 * @param {Filter} filter - The filter to apply
 * @returns {Promise<QuerySnapshot<DocumentData>>} - The query snapshot
 */
export async function getByFilter(collectionName: string, filter: Filter): Promise<QuerySnapshot<DocumentData>> {
  return await db.collection(collectionName).where(filter).get();
}

/* UPDATE METHODS */

/**
 * Function to update a document by id from a collection
 * @param {string} collectionName - The name of the collection to update data from
 * @param {string} id - The id of the document to update
 * @param {any} data - The data to be updated
 */
export async function updateById(collectionName: string, id: string, data: any) {
  await db.collection(collectionName).doc(id).update(data);
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

  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

/* HELPER METHODS */

/**
 * Helper method to get the database collection
 * @param {string} collectionName - The name of the collection
 * @returns {CollectionReference} - The collection reference
 */
export function getCollection(collectionName: string): CollectionReference {
  return db.collection(collectionName);
}

/**
 * Helper method to get the document data from a document reference
 * @param {DocumentReference<DocumentData>} docRef - The document reference
 * @returns {any | undefined} - The data of the document if present
 */
export async function getDataFromDocumentReference(docRef: DocumentReference<DocumentData>): Promise<any | undefined> {
  return getDataFromDocumentSnapshot(await docRef.get());
}

/**
 * Helper method to get document data from multiple document reference
 * @param {DocumentReference<DocumentData>[]} docsRef - The document references
 * @returns {any[]} - The data of the documents
 */
export async function getDataFromDocumentReferences(docsRef: DocumentReference<DocumentData>[]): Promise<any[]> {
  const data = [];

  for (const docRef of docsRef) {
    const docData = await getDataFromDocumentReference(docRef);
    if(docData) data.push(docData);
  }

  return data;
}

/**
 * Helper method to get the id from a document snapshot
 * @param {DocumentSnapshot<DocumentData>} doc - The document snapshot
 * @returns {string} - The id of the document
 */
export function getIdFromDocumentSnapshot(doc: DocumentSnapshot<DocumentData>): string {
  return doc.id;
}

/**
 * Helper method to get the document reference from a document snapshot
 * @param {DocumentSnapshot<DocumentData>} doc - The document snapshot
 * @returns {DocumentReference} - The document reference
 */
export function getDocumentReferenceFromDocumentSnapshot(doc: DocumentSnapshot<DocumentData>): DocumentReference {
  return doc.ref;
}

/**
 * Helper method to get the data from a document snapshot
 * @param {DocumentSnapshot<DocumentData>} doc - The document snapshot
 * @returns {any | undefined} - The data of the document if present
 */
export function getDataFromDocumentSnapshot(doc: DocumentSnapshot<DocumentData>): any | undefined{
  return doc.data();
}

/**
 * Helper methods to check if a document snapshot has data
 * @param {DocumentSnapshot<DocumentData>} doc - The document snapshot
 * @returns {boolean} - Whether the document snapshot has data
 */
export function isDocumentDataPresent(doc: DocumentSnapshot<DocumentData>): boolean {
  return doc.exists;
}

/**
 * Helper method to get the size of a query snapshot
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {number} - The size of the query snapshot
 */
export function getQuerySnapshotSize(querySnapshot: QuerySnapshot<DocumentData>): number {
  return querySnapshot.size;
}

/**
 * Helper method to check if a query snapshot is empty
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {boolean} - Whether the query snapshot is empty
 */
export function isQuerySnapshotEmpty(querySnapshot: QuerySnapshot<DocumentData>) {
  return querySnapshot.empty;
}

/**
 * Helper method to get the documents from a query snapshot
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {QueryDocumentSnapshot<DocumentData>[]} - The documents in the query snapshot
 */
export function getQuerySnapshotDocuments(querySnapshot: QuerySnapshot<DocumentData>): QueryDocumentSnapshot<DocumentData>[] {
  return querySnapshot.docs;
}

/**
 * Helper method to get all the data from a query snapshot
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {any[]} - All the data in the query snapshot
 */
export function getDataFromQuerySnapshot(querySnapshot: QuerySnapshot<DocumentData>): any[] {
  return querySnapshot.docs.map(doc => doc.data());
}

/**
 * Helper method to get all the ids from a query snapshot
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {string[]} - All the ids in the query snapshot
 */
export function getIdsFromQuerySnapshot(querySnapshot: QuerySnapshot<DocumentData>): string[] {
  return querySnapshot.docs.map(doc => doc.id);
}

/**
 * Helper method to get all the document references from a query snapshot
 * @param {QuerySnapshot<DocumentData>} querySnapshot - The query snapshot
 * @returns {DocumentReference[]} - All the document references in the query snapshot
 */
export function getDocumentReferencesFromQuerySnapshot(querySnapshot: QuerySnapshot<DocumentData>): DocumentReference[] {
  return querySnapshot.docs.map(doc => doc.ref);
}

export * as FirestoreUtil from "./firestore";
