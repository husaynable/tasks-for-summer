import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items: ItemModel[];
  isAdding = false;

  constructor(
    public dialogRef: MatDialogRef<ItemsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { caption: string, items: ItemModel[] }
  ) { }

  ngOnInit() {
    this.items = [...this.data.items];
  }

  addItem(name: string) {
    const newItem: ItemModel = { name, timestamp: new Date() };
    this.items.push(newItem);
    this.isAdding = false;
  }

  deleteItem(index: number) {
    this.items.splice(index);
  }

  close() {
    this.dialogRef.close(this.items);
  }
}
