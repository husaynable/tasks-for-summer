import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// admin.initializeApp();

interface DocData {
  docPath: string;
  fieldName: string;
}

const values: { [name: string]: DocData } = {
  movies: {
    docPath: '/tasks-test/48K5RTbAc5vbNwcDSyGu',
    fieldName: 'drunkDrinks'
  },
  drinks: {
    docPath: '/tasks-test/cwgY884Viawk4zXwp8iR',
    fieldName: 'watchedMovies'
  }
};

const doEverithing = async ({ docPath, fieldName }: DocData, operation: '+' | '-') => {
  const doc = admin.firestore().doc(docPath);
  const currCount = ((await doc.get()).data() as FirebaseFirestore.DocumentData)[fieldName];
  await doc.update({ fieldName: currCount + 1 });
};

export const onCreate = functions.firestore.document('/items/{itemId}').onCreate(async (snap, context) => {
  if (snap.data()) {
    const snapData = snap.data() as FirebaseFirestore.DocumentData;
    await doEverithing(values[snapData.type], '+');
  }
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
