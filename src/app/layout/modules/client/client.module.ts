import { NgModule } from '@angular/core';

import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';

import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientFormComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
