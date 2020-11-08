import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'client-list', pathMatch: 'full'
  },
  {
    path: 'client-list', component: ClientListComponent
  },
  {
    path: 'client-form', component: ClientFormComponent
  },
  {
    path: 'client-form/:id', component: ClientFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
