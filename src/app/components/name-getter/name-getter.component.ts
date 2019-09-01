import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PictureTakerComponent } from '../picture-taker/picture-taker.component';

@Component({
  selector: 'app-name-getter',
  templateUrl: './name-getter.component.html',
  styleUrls: ['./name-getter.component.css']
})
export class NameGetterComponent implements OnInit {
  public hasAttachedPic = false;
  selectedPic: File;

  constructor(private dialogRef: MatDialogRef<NameGetterComponent>, private modal: MatDialog) {}

  ngOnInit() {}

  takePic() {
    this.modal.open(PictureTakerComponent, {
      width: '600px'
    });
  }

  picIsPicked(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files.item(0);
    if (file) {
      this.hasAttachedPic = true;
      this.selectedPic = file;
    }
    console.log(file);
  }

  close(name: string) {
    this.dialogRef.close({ name, pic: this.selectedPic });
  }
}
