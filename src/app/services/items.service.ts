import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { Observable } from 'rxjs';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  addDoc,
  where,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  itemsCollection: CollectionReference<ItemModel>;

  constructor(db: Firestore) {
    this.itemsCollection = collection(db, 'items') as CollectionReference<ItemModel>;
  }

  getItems(itemsType: string): Observable<ItemModel[]> {
    const wh = where('type', '==', itemsType);
    const ordBy = orderBy('timestamp');
    const q = query<ItemModel>(this.itemsCollection, wh, ordBy);
    return collectionData<ItemModel>(q, { idField: 'id' });
  }

  addItem(item: ItemModel) {
    return addDoc(this.itemsCollection, item);
  }

  updateItem(item: ItemModel) {
    const dRef = doc(this.itemsCollection, item.id);
    return updateDoc(dRef, item);
  }

  removeItem(itemId: string) {
    const dRef = doc(this.itemsCollection, itemId);
    return deleteDoc(dRef);
  }
}
