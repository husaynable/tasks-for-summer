import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
// const uuid = require('uuid/v4');

@Injectable()
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  updload(itemType: 'drinks' | 'movies', file: File) {
    const fileExt = file.name.split('.').pop();
    // const id = uuid();
    const date = new Date().toLocaleString();
    const imgRef = this.storage.ref(`${itemType}/${date}.${fileExt}`);
    return imgRef.put(file).snapshotChanges();
  }
}
