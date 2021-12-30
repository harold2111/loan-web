import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from './shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    NavigationComponent
  ],
  imports: [
    SharedModule,
    LayoutRoutingModule,
  ],
  exports : [
  ],
  providers: [
  ],
})
export class LayoutModule { }
