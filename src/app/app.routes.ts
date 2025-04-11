import { Routes } from '@angular/router';
import { LoginComponent } from './commons/auth/login/login.component';
import { LogoutComponent } from './commons/auth/logout/logout.component';
import { AuthGuard } from './security/auth.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'public', pathMatch: 'full'
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'client',

    canActivate: [AuthGuard],
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  },

  // FOR AUTHENTICATION
  {
    path: 'auth/login',
    canActivate: [AuthGuard],
    component: LoginComponent
  },
  {
    path: 'auth/logout',

    canActivate: [AuthGuard],
    component: LogoutComponent
  }
];
