import * as admin from 'firebase-admin';
//import { FirestoreData, FirestoreMock } from 'firebase-mock'


const update = jest.fn();
const doc = jest.fn(() => ({update}));
const collection = jest.spyOn(admin.firestore(), 'collection').mockReturnValue((({ doc } as unknown) as any));

describe('', () => {
 test('', () => {
  admin.initializeApp()
  expect(collection).toHaveBeenCalledWith('emission_factors');      
  });
});
