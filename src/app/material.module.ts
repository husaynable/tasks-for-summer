import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatCheckboxModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  exports: [MatCheckboxModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule]
})
export class MaterialModule { }
