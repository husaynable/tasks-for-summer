import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SubSink } from 'subsink';

declare var require: any;
const uuid = require('uuid/v4');

@Component({
  selector: 'app-name-getter',
  templateUrl: './name-getter.component.html',
  styleUrls: ['./name-getter.component.css']
})
export class NameGetterComponent implements OnInit, OnDestroy {
  public hasAttachedPic = false;
  selectedPic: File;
  uploadPercent: Observable<number>;
  isUploaded = false;
  picRef: AngularFireStorageReference;
  picUrl: string;
  subSink = new SubSink();

  constructor(
    private dialogRef: MatDialogRef<NameGetterComponent>,
    private modal: MatDialog,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}

  picIsPicked(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files.item(0);
    if (file) {
      if (this.hasAttachedPic && this.picRef) {
        this.clearPic();
      }

      this.hasAttachedPic = true;
      this.selectedPic = file;

      const fileExt = file.name.split('.').pop();
      const id = uuid();
      const filePath = `${id}.${fileExt}`;

      this.picRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      this.uploadPercent = task.percentageChanges();
      this.subSink.sink = task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.subSink.sink = this.picRef.getDownloadURL().subscribe(url => {
              this.isUploaded = true;
              this.picUrl = url;
            });
          })
        )
        .subscribe();
    }
  }

  clearPic() {
    this.subSink.sink = this.picRef.delete().subscribe();
    this.isUploaded = false;
    this.hasAttachedPic = false;
    this.picUrl = null;
  }

  close(name: string) {
    this.dialogRef.close({ name, picUrl: this.picUrl });
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
