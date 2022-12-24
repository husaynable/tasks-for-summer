import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ItemModel } from '../models/item.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  itemsCollection: AngularFirestoreCollection<ItemModel>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.itemsCollection = db.collection('items');
  }

  getItems(itemsType: string): Observable<ItemModel[]> {
    return this.db
      .collection<ItemModel>('items', (ref) => ref.where('type', '==', itemsType).orderBy('timestamp'))
      .valueChanges({ idField: 'id' });
  }

  addItem(item: ItemModel) {
    return this.itemsCollection.add(item);
  }

  updateItem(item: ItemModel) {
    return this.itemsCollection.doc(item.id).update(item);
  }

  removeItem(itemId: string, attachmentRef?: string) {
    const doc = this.itemsCollection.doc(itemId);
    return doc.delete();
  }
}
