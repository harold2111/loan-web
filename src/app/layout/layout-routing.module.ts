import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: () => import('./modules/blank-page/blank-page.module').then(m => m.BlankPageModule) },
      { path: 'client', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule) },
      { path: 'loan', loadChildren: () => import('./modules/loan/loan.module').then(m => m.LoanModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
