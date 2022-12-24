import { NgModule } from '@angular/core';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
const modules = [
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
  MatListModule,
  OverlayModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule,
  MatRippleModule,
  MatNativeDateModule,
  MatDatepickerModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
