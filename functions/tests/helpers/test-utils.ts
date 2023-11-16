/**
 * Interface to simulate Firestore QuerySnapshot type/object
 */
export interface QuerySnapshot<T> {
	docs: QueryDocumentSnapshot<T>[];
}

/**
 * Interface to simulate Firestore QueryDocumentSnapshot type/object
 */
export interface QueryDocumentSnapshot<T> {
	data(): T;
}


/**
 * Interface to simulate Firestore DocumentSnapshot type/object
 */
export interface DocumentSnapshot<T> {
	data(): T;
}

/**
   * DocumentSnapshot generator
   * @param {T} item - The item to be set
   * @returns {DocumentDocumentSnapshot<T>} - The document snapshot
   */
export function generateDocumentSnapshot<T>(item: T): DocumentSnapshot<T> {
  return {
    data: () => item,
  };
}


/**
 * QueryDocumentSnapshot generator
 * @param {T} item - The item to be set
 * @returns {QueryDocumentSnapshot<T>} - The query document snapshot
 */
export function generateQueryDocumentSnapshot<T>(item: T): QueryDocumentSnapshot<T> {
  return {
    data: () => item,
  };
}

/**
 * Setter for the QuerySnapshot
 * @param {T[]} data - The data to be set
 * @returns {QuerySnapshot<T>} - The query snapshot
 */
export function generateQuerySnapshot<T>(data: T[]): QuerySnapshot<T> {
  const querySnapshot: QuerySnapshot<T> = {
    docs: [],
  };

  for (const item of data) {
    querySnapshot.docs.push(generateQueryDocumentSnapshot(item));
  }

  return querySnapshot;
}

export * as TestUtils from "./test-utils";
