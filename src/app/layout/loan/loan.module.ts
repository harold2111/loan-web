import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Material Design Component
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import { LoanRoutingModule } from './loan-routing.module';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    LoanRoutingModule
  ],
  declarations: [
    LoanListComponent,
    LoanFormComponent
  ]
})
export class LoanModule { }
