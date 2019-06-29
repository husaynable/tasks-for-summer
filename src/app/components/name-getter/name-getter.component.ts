import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PictureTakerComponent } from '../picture-taker/picture-taker.component';

@Component({
  selector: 'app-name-getter',
  templateUrl: './name-getter.component.html',
  styleUrls: ['./name-getter.component.css']
})
export class NameGetterComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<NameGetterComponent>, private modal: MatDialog) {}

  ngOnInit() {}

  takePic() {
    this.modal.open(PictureTakerComponent, {
      width: '600px'
    });
  }
}
