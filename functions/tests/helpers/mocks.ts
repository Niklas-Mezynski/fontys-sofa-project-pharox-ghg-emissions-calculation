/* eslint-disable @typescript-eslint/no-unused-vars */

export interface QuerySnapshot<T> {
	docs: DocumentSnapshot<T>[];
}

export interface DocumentSnapshot<T> {
	data(): T;
}

export class Mock<T> {
  private _documentSnapshot!: DocumentSnapshot<T>;
  private _querySnapshot!: QuerySnapshot<T>;
  private _data: T[];
  private _appMock: any;
  private _firestoreMock: any;

  constructor(data: T[]) {
    this._data = data;
    this.setQuerySnapshot(data);
    this.setDocumentSnapshot(data[0]);
  }

  public getDocumentSnapshot(): DocumentSnapshot<T> {
    return this._documentSnapshot;
  }

  public setDocumentSnapshot(item: T): void {
    this._documentSnapshot = {
      data: () => item,
    };
  }

  public getQuerySnapshot(): QuerySnapshot<T> {
    return this._querySnapshot;
  }

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

  public resetMockToDefaultData(): void {
    this.setQuerySnapshot(this._data);
    this.setDocumentSnapshot(this._data[0]);
  }

  /**
	 * Mock initialization of the Firebase App
	 * @returns {void}
	 */
  public mockFirebaseApplication(): void {
    this._appMock = jest.mock("firebase-admin/app", () => ({
      initializeApp: jest.fn(),
    }));
  }

  /**
	 * Mock the different Firestore methods
	 * @returns {void}
	 */
  public mockFirestore(): void {
    this._firestoreMock = jest.mock("firebase-admin/firestore", () => ({
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

  public clearMocks(): void {
    if(this._appMock) this._appMock.mockClear();
    if(this._firestoreMock) this._firestoreMock.mockClear();
  }

}