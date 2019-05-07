import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule, MatToolbarModule, MatIconModule
  ]
})
export class MaterialModule { }
