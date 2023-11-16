/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Interface to simulate Firestore QuerySnapshot type/object
 */
export interface QuerySnapshot<T> {
	docs: DocumentSnapshot<T>[];
}

/**
 * Interface to simulate Firestore DocumentSnapshot type/object
 */
export interface DocumentSnapshot<T> {
	data(): T;
}

/**
 * Class to mock the Firebase and Firestore methods
 */
export class Mock<T> {
  private _documentSnapshot!: DocumentSnapshot<T>;
  private _querySnapshot!: QuerySnapshot<T>;
  private _data: T[];

  constructor(data: T[]) {
    this._data = data;
    this.setQuerySnapshot(data);
    this.setDocumentSnapshot(data[0]);
  }

  /**
   * Getter for the DocumentSnapshot
   * @returns {DocumentSnapshot<T>} The document snapshot
   */
  public getDocumentSnapshot(): DocumentSnapshot<T> {
    return this._documentSnapshot;
  }

  /**
   * Setter for the DocumentSnapshot
   * @param {T} item - The item to be set
   * @returns {void}
   */
  public setDocumentSnapshot(item: T): void {
    this._documentSnapshot = {
      data: () => item,
    };
  }

  /**
   * Getter for the QuerySnapshot
   * @returns {QuerySnapshot<T>} The query snapshot
   */
  public getQuerySnapshot(): QuerySnapshot<T> {
    return this._querySnapshot;
  }

  /**
   * Setter for the QuerySnapshot
   * @param {T[]} data - The data to be set
   */
  public setQuerySnapshot(data: T[]) {
    const querySnapshot: QuerySnapshot<T> = {
      docs: [],
    }

    for (const item of data) {
      querySnapshot.docs.push({
        data: () => item,
      });
    }

    this._querySnapshot = querySnapshot;
  }

  /**
   * Reset the mocked values to the default data
   * @returns {void}
   */
  public resetMockToDefaultData(): void {
    this.setQuerySnapshot(this._data);
    this.setDocumentSnapshot(this._data[0]);
  }

  /**
	 * Mock initialization of the Firebase App
	 * @returns {void}
	 */
  public mockFirebaseApplication(): void {
    jest.mock("firebase-admin/app", () => ({
      initializeApp: jest.fn(),
    }));
  }

  /**
	 * Mock the different Firestore methods
	 * @returns {void}
	 */
  public mockFirestore(): void {
    jest.mock("firebase-admin/firestore", () => ({
      getFirestore: jest.fn(() => ({
        collection: jest.fn((path) => ({
          get: jest.fn().mockResolvedValue(this.getQuerySnapshot()),
          where: jest.fn((filter) => ({
            get: jest.fn().mockResolvedValue(this.getQuerySnapshot()),
          })),
          doc: jest.fn((ref) => ({
            get: jest.fn().mockResolvedValue(this.getDocumentSnapshot()),
          })),
        })),
      })),
    }));
  }
}
