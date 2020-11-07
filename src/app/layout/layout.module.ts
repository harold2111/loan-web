import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from './shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    LayoutRoutingModule
  ],
  exports : [
  ],
  providers: [
  ],
})
export class LayoutModule { }
