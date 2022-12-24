import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable()
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  updload(itemType: 'drinks' | 'movies', file: File) {
    const fileExt = file.name.split('.').pop();
    const date = new Date().toLocaleString();
    const imgRef = this.storage.ref(`${itemType}/${date}.${fileExt}`);
    return imgRef.put(file).snapshotChanges();
  }
}
