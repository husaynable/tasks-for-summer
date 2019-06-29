import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CameraMode } from 'src/app/utils/types';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { b64toBlob } from 'src/app/utils/functions';

@Component({
  selector: 'app-picture-taker',
  templateUrl: './picture-taker.component.html',
  styleUrls: ['./picture-taker.component.css']
})
export class PictureTakerComponent implements AfterViewInit {
  @ViewChild('video', { static: false })
  public video: ElementRef;

  @ViewChild('canvas', { static: false })
  public canvas: ElementRef;

  public hasSecondCamera = false;
  private mode: CameraMode = CameraMode.Environment;

  public photoHeight = 640;
  public photoWidth = 480;

  constructor(private dialogRef: MatDialogRef<PictureTakerComponent>, private storage: AngularFireStorage) {}

  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices: MediaDeviceInfo[]) => (this.hasSecondCamera = devices.length > 1))
        .catch(err => console.error(err));

      navigator.mediaDevices
        .getUserMedia({ audio: false, video: { facingMode: this.mode } })
        .then(stream => {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        })
        .catch(err => console.error(err));
    }
  }

  capture() {
    const context = this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, this.photoWidth, this.photoHeight);
    const url = this.canvas.nativeElement.toDataURL('image/png', 1.0);
    const a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.download = 'photo.png';
    a.click();

    //const imgBlob = b64toBlob();

    // const id = `f${(+new Date).toString(16)}`;
    // const imageRef = this.storage.ref(`drinks/${id}.png` );
    // const imageUploadTask = imageRef.put(imgBlob);
    // imageUploadTask.snapshotChanges().pipe(
    //   finalize(() => {
    //     imageRef.getDownloadURL().subscribe(url => {
    //       const a = document.createElement('a');
    //       a.target = '_blank';
    //       a.href = url;
    //       a.download = 'photo.png';
    //       a.click();
    //     });
    //   })
    // ).subscribe();
    // console.log(this.canvas.nativeElement.toDataURL('image/png'));
  }
}
