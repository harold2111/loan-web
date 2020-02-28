import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

// Material Design Component
import {MaterialModule} from '../material.module';
// Flex
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessagesComponent } from './shared/components/messages/messages.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    LayoutComponent,
    MessagesComponent
  ],
  providers: [
  ],
})
export class LayoutModule { }
