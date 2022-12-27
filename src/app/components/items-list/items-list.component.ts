import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { ItemModel } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';
import { CreateItemModel } from 'src/app/models/create-item.model';
import { ItemsType } from 'src/app/models/items.type';

import { NameGetterComponent } from '../name-getter/name-getter.component';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit, OnDestroy {
  public items$?: Observable<ItemModel[]>;
  public captions = {
    movies: 'Movies List',
    drinks: 'Drunk Drinks',
  };

  private subs = new SubSink();

  constructor(
    public dialogRef: MatDialogRef<ItemsListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { itemsType: ItemsType },
    private itemsService: ItemsService,
    private modal: MatDialog
  ) {}

  ngOnInit() {
    this.items$ = this.itemsService.getItems(this.data.itemsType);
  }

  openNameGetter() {
    const dialogRef = this.modal.open(NameGetterComponent, {
      width: '400px',
      data: { hidePicAttachment: false },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((newItem: CreateItemModel) => {
      if (newItem && newItem.name) {
        this.addItem(newItem.name, newItem.picUrl);
      }
    });
  }

  addItem(name: string, attachUrl?: string) {
    const newItem: ItemModel = {
      name,
      timestamp: Timestamp.now(),
      type: this.data.itemsType,
    };
    if (attachUrl) {
      newItem.attachmentUrl = attachUrl;
    }
    this.itemsService.addItem(newItem);
  }

  showPhoto(url: string) {
    const anchorEl = document.createElement('a');
    anchorEl.href = url;
    anchorEl.target = '_blank';
    document.body.appendChild(anchorEl);
    anchorEl.click();
    anchorEl.remove();
  }

  deleteItem(itemId?: string) {
    if (itemId) {
      this.itemsService.removeItem(itemId);
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
