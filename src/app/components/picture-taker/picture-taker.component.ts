import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(private dialogRef: MatDialogRef<PictureTakerComponent>) {}

  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          this.video.nativeElement.src = window.URL.createObjectURL(stream);
          this.video.nativeElement.play();
        })
        .catch(err => console.log(err));
    }
  }

  capture() {
    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 480, 480);
    console.log(this.canvas.nativeElement.toDataURL('image/png'));
  }
}
