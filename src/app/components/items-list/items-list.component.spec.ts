import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListComponent } from './items-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from 'src/app/services/items.service';
import { MaterialModule } from 'src/app/material.module';

fdescribe('ItemsListComponent', () => {
  let spectrator: Spectator<ItemsListComponent>;
  const createComponent = createComponentFactory({
    component: ItemsListComponent,
    detectChanges: false,
    mocks: [MatDialogRef, ItemsService, MatDialog],
    imports: [MaterialModule],
    providers: [{ provide: MAT_DIALOG_DATA, useValue: { itemsType: 'movies' } }]
  });

  beforeEach(() => (spectrator = createComponent()));

  it('should show right caption', () => {
    spectrator.detectChanges();

    expect(spectrator.query('h2').textContent).toBe('Movies List');
  });
});
