import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import {
  percentage,
  ref,
  Storage,
  StorageReference,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from '@angular/fire/storage';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-name-getter',
  templateUrl: './name-getter.component.html',
  styleUrls: ['./name-getter.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class NameGetterComponent implements OnInit {
  public hasAttachedPic = false;
  public selectedPic?: File;
  public uploadPercent?: Observable<number | undefined>;
  public isUploaded = false;
  public picUrl?: string;
  public hidePicAttachment = false;

  private picRef?: StorageReference;

  constructor(
    private dialogRef: MatDialogRef<NameGetterComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { hidePicAttachment: boolean },
    private storage: Storage
  ) {}

  ngOnInit() {
    this.hidePicAttachment = !!this.data.hidePicAttachment;
  }

  picIsPicked(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.item(0);
    if (file) {
      if (this.hasAttachedPic && this.picRef) {
        this.clearPic();
      }

      this.hasAttachedPic = true;
      this.selectedPic = file;

      const fileExt = file.name.split('.').pop();
      const id = crypto.randomUUID();
      const filePath = `${id}.${fileExt}`;

      this.picRef = ref(this.storage, filePath);
      const task = uploadBytesResumable(this.picRef, file);

      this.uploadPercent = percentage(task).pipe(map((progressObj) => progressObj.progress));
      task.then(async () => {
        const url = await getDownloadURL(this.picRef!);
        this.isUploaded = true;
        this.picUrl = url;
      });
    }
  }

  clearPic() {
    if (this.picRef) {
      deleteObject(this.picRef);
    }
    this.isUploaded = false;
    this.hasAttachedPic = false;
    this.picUrl = undefined;
  }

  close(name: string) {
    this.dialogRef.close({ name, picUrl: this.picUrl });
  }
}
