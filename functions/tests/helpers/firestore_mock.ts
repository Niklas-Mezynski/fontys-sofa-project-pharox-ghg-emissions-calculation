export default class FirestoreMock {
  private _mockAddReturn: any;
  private _mockGetReturn: any;
  private _mockOnSnaptshotSuccess: any;

  public mockCollection;
  public mockWhere;
  public mockOrderBy;
  public mockAdd;
  public mockGet;
  public mockOnSnaptshot;

  constructor() {
    // mocked methods that return the class
    this.mockCollection = jest.fn((collection) => this);
    this.mockWhere = jest.fn((...args) => this);
    this.mockOrderBy = jest.fn((...args) => this);

    // methods that return promises
    this.mockAdd = jest.fn((val) => Promise.resolve(this._mockAddReturn));
    this.mockGet = jest.fn(() => Promise.resolve(this._mockGetReturn));

    // methods that accepts callbacks
    this.mockOnSnaptshot = jest.fn((success, error) => success(this._mockOnSnaptshotSuccess));

    // return values
    this._mockAddReturn = null;
    this._mockGetReturn = null;
    this._mockOnSnaptshotSuccess = null;
  }

  collection(collection: any) {
    return this.mockCollection(collection);
  }

  where(...args: any[]) {
    return this.mockWhere(...args);
  }

  orderBy(...args: any[]) {
    return this.mockOrderBy(...args);
  }

  add(val: any) {
    return this.mockAdd(val);
  }

  get() {
    return this.mockGet();
  }

  onSnapshot(success: any, error: any) {
    return this.mockOnSnaptshot(success, error);
  }

  set mockAddReturn(val: any) {
    this._mockAddReturn = val;
  }

  set mockGetReturn(val: any) {
    this._mockGetReturn = val;
  }

  set mockOnSnaptshotSuccess(val: any) {
    this._mockOnSnaptshotSuccess = val;
  }

  reset() {
    // reset all the mocked returns
    this._mockAddReturn = null;
    this._mockGetReturn = null;
    this._mockOnSnaptshotSuccess = null;

    // reset all the mocked functions
    this.mockCollection.mockClear();
    this.mockWhere.mockClear();
    this.mockOrderBy.mockClear();
    this.mockAdd.mockClear();
    this.mockGet.mockClear();
  }
}