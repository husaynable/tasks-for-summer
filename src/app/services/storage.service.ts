import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
const uuid = require('uuid/v4');

@Injectable()
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  updload(itemType: 'drinks' | 'movies', file: File) {
    const fileExt = file.name.split('.').pop();
    const id = uuid();
    const imgRef = this.storage.ref(`${itemType}/${id}.${fileExt}`);
    return imgRef.put(file);
  }
}
