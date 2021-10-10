import { Routes} from '@angular/router';
import { LoginComponent } from 'src/app/component/login/login.component';
import { InterestShownComponent } from 'src/app/interest-shown/interest-shown.component';
import { FullComponent } from 'src/app/layouts/full/full.component';
import { MainComponent } from '../component/main/main.component';
import { AuthGuard } from './auth.guard';


export const Approutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'interest',
    component: InterestShownComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'goodtime',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'starter',
        loadChildren: () => import('../../starter/starter.module').then(m => m.StarterModule)
      },
       {
         path: 'component',
         loadChildren: () => import('../../component/component.module').then(m => m.ComponentsModule)
       }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
