import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { ItemModel } from '../models/item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsCollection: AngularFirestoreCollection<ItemModel>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection('items');
  }

  getItems(itemsType: 'drinks' | 'movies'): Observable<ItemModel[]> {
    return this.db
      .collection('items', ref => ref.where('type', '==', itemsType))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            let data = a.payload.doc.data() as ItemModel;
            data = { ...data, timestamp: data.timestamp.toDate() };
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  addItem(item: ItemModel) {
    const itemToAdd = {
      ...item,
      timestamp: firebase.firestore.Timestamp.fromDate(item.timestamp)
    };
    return this.itemsCollection.add(itemToAdd);
  }

  updateItem(item: ItemModel) {
    const newItem = {
      ...item,
      timestamp: firebase.firestore.Timestamp.fromDate(item.timestamp)
    };
    return this.itemsCollection.doc(newItem.id).update(newItem);
  }

  removeItem(itemId: string) {
    return this.itemsCollection.doc(itemId).delete();
  }
}
