import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
  ],
  exports: [
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
  ],
})
export class MaterialModule { }
