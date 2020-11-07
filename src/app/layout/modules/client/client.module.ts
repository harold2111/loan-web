import { NgModule } from '@angular/core';

import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientViewComponent } from './components/client-view/client-view.component';

import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ClientListComponent,
    ClientFormComponent,
    ClientViewComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
