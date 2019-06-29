import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PictureTakerComponent } from '../picture-taker/picture-taker.component';

@Component({
  selector: 'app-name-getter',
  templateUrl: './name-getter.component.html',
  styleUrls: ['./name-getter.component.css']
})
export class NameGetterComponent implements OnInit, AfterViewInit {
  public hasMediaDevice = false;

  constructor(private dialogRef: MatDialogRef<NameGetterComponent>, private modal: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => (this.hasMediaDevice = devices.length > 0))
      .catch(err => console.error(err));
  }

  takePic() {
    this.modal.open(PictureTakerComponent, {
      width: '600px'
    });
  }
}
