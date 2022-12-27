import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable()
export class StorageService {
  constructor(private storage: Storage) {}

  updload(itemType: 'drinks' | 'movies', file: File) {
    const fileExt = file.name.split('.').pop();
    const date = new Date().toLocaleString();
    const imgRef = ref(this.storage, `${itemType}/${date}.${fileExt}`);
    return uploadBytes(imgRef, file);
  }
}
