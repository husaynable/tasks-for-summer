import firebase from 'firebase/app';

export interface ItemModel {
  id?: string;
  name: string;
  timestamp: firebase.firestore.Timestamp;
  type: string;
  attachmentUrl?: string;
}
