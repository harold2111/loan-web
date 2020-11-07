import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MessagesComponent } from './components/messages/messages.component';
@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ],
})
export class SharedModule { }
