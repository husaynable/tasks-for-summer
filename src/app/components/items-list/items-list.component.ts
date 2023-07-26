import { Component, OnInit, Inject, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ItemModel } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';
import { CreateItemModel } from 'src/app/models/create-item.model';
import { ItemsType } from 'src/app/models/items.type';

import { NameGetterComponent } from '../name-getter/name-getter.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, DatePipe, MatButtonModule, MatIconModule, MatDialogModule],
})
export class ItemsListComponent implements OnInit {
  public items$?: Observable<ItemModel[]>;
  public captions = {
    movies: 'Movies List',
    drinks: 'Drunk Drinks',
  };

  private destroyRef = inject(DestroyRef);

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
    this.modal
      .open(NameGetterComponent, {
        width: '400px',
        data: { hidePicAttachment: false },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newItem: CreateItemModel) => {
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
}
