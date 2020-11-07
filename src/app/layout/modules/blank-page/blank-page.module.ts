import { NgModule } from '@angular/core';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BlankPageComponent
  ],
  imports: [
    SharedModule,
    BlankPageRoutingModule
  ],
})
export class BlankPageModule { }
