import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HistoryComponent } from './core/menus/history/history.component';
import { AccountComponent } from './core/menus/account/account.component';
import { ImproveSectionComponent } from './core/menus/improve-section/improve-section.component';
import { UploadContentComponent } from './core/menus/videos/upload-content/upload-content.component';
import { UploadVideosComponent } from './core/menus/videos/upload-videos/upload-videos.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },

      // sirve para teenr proxima paginas en desarollo o colocar estamso trabajando apra mejorar este apartado
       { path: 'improve', component: ImproveSectionComponent, canActivate: [AuthGuard] },
       { path: 'upload', component: UploadContentComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
