import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'loan-list', pathMatch: 'full'
  },
  {
    path: 'loan-list', component: LoanListComponent
  },
  {
    path: 'loan-form', component: LoanFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
