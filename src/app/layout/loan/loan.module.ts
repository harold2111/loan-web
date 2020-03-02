import { NgModule } from '@angular/core';

import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';

import { LoanRoutingModule } from './loan-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoanListComponent,
    LoanFormComponent
  ],
  imports: [
    SharedModule,
    LoanRoutingModule
  ]
})
export class LoanModule { }
