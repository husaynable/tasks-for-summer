import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

interface DocData {
  docPath: string;
  fieldName: string;
}

const values: { [name: string]: DocData } = {
  drinks: {
    docPath: '/tasks-test/48K5RTbAc5vbNwcDSyGu',
    fieldName: 'drunkDrinks'
  },
  movies: {
    docPath: '/tasks-test/cwgY884Viawk4zXwp8iR',
    fieldName: 'watchedMovies'
  }
};

const doEverithing = async ({ docPath, fieldName }: DocData, itemType: 'drinks' | 'movies') => {
  const query = await admin
    .firestore()
    .collection('items')
    .where('type', '==', itemType)
    .get();
  const currCount = query.size; // ((await doc.get()).data() as FirebaseFirestore.DocumentData)[fieldName];

  const doc = admin.firestore().doc(docPath);
  await doc.update({ [fieldName]: currCount });
};

export const onCreate = functions.firestore.document('/items/{itemId}').onCreate(async (snap, context) => {
  if (snap.data()) {
    const snapData = snap.data() as FirebaseFirestore.DocumentData;
    await doEverithing(values[snapData.type], snapData.type);
  }
});

export const onDelete = functions.firestore.document('/items/{itemId}').onDelete(async (snap, context) => {
  const snapData = snap.data();
  if (snapData) {
    const attachmentUrl = snapData.attachmentUrl;
    if (attachmentUrl) {
      const fileName = attachmentUrl
        .split('?')[0]
        .split('/')
        .pop();
      if (fileName !== undefined) {
        admin
          .storage()
          .bucket('tasks-for-summer.appspot.com')
          .file(fileName)
          .delete()
          .catch((err: any) => console.warn(err));
      }
    }
    await doEverithing(values[snapData.type], snapData.type);
  }
});
