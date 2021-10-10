import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterestShownComponent } from './interest-shown/interest-shown.component';
import { LoginComponent } from './component/login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { MainComponent } from './shared/component/main/main.component';


export const Approutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'interest',
    component: InterestShownComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'goodtime',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },
       {
         path: 'component',
         loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
       }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
