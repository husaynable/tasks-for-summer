import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/items.service';
import { Observable, Subscription } from 'rxjs';
import { NameGetterComponent } from '../name-getter/name-getter.component';
import { CreateItemModel } from 'src/app/models/create-item.model';
import { StorageService } from 'src/app/services/storage.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  items: Observable<ItemModel[]>;
  itemsCount: number;
  itemsCountSub$: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ItemsListComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { caption: string; itemsType: 'drinks' | 'movies' },
    private itemsService: ItemsService,
    private modal: MatDialog
  ) {}

  ngOnInit() {
    this.items = this.itemsService.getItems(this.data.itemsType);
    this.itemsCountSub$ = this.itemsService
      .getItems(this.data.itemsType)
      .subscribe(items => (this.itemsCount = items.length));
  }

  openNameGetter() {
    const dialogRef = this.modal.open(NameGetterComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((newItem: CreateItemModel) => {
      if (newItem && newItem.name) {
        if (newItem.picUrl) {
          this.addItem(newItem.name, newItem.picUrl);
        } else {
          this.addItem(newItem.name);
        }
      }
    });
  }

  addItem(name: string, attachUrl?: string) {
    const newItem: ItemModel = {
      name,
      timestamp: new Date(),
      type: this.data.itemsType
    };
    if (attachUrl) {
      newItem.attachmentUrl = attachUrl;
    }
    this.itemsService.addItem(newItem);
  }

  deleteItem(itemId: string) {
    this.itemsService.removeItem(itemId);
  }

  close() {
    this.dialogRef.close(this.itemsCount);
  }

  ngOnDestroy() {
    if (this.itemsCountSub$) {
      this.itemsCountSub$.unsubscribe();
    }
  }
}
