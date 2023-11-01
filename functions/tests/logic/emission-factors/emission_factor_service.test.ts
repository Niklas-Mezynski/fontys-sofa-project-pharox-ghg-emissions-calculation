import FirestoreMock from "../../helpers/firestore_mock";
// import firebase from "firebase/app";
import "firebase/firestore";

describe("Emission factors - Fuel emission factors", () => {
  const firestoreMock = new FirestoreMock();

  beforeEach(() => {
    // firebase.firestore = firestoreMock;
    firestoreMock.reset();
  });

  test("Create fuel emission factor returns created factor", async () => {
    it("does something", (done) => {
      firestoreMock.mockAddReturn = { id: "test-id" };
      // firebase.firestore.collection("foobar")
      //   .add({foo: "bar"})
      //   .then((res: { id: any; }) => {
      //     expect(firestoreMock.mockCollection).toBeCalledWith("foobar");
      //     expect(firestoreMock.mockAdd).toBeCalledWith({foo: "bar"});
      //     expect(res.id).toEqual("test-id");
      //     done();
      //   })
      //   .catch(done);
    });
  });
});

describe("Emission factors - Intensity emission factors", () => {
  test("Hello World function returns 'Hello world!'", async () => {

  });
});