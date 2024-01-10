import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPanelPageComponent } from './pages/user-panel-page/user-panel-page.component';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { RedirectComponent } from './component/redirect/redirect.component';
import { AdminPanelPageComponent } from './pages/admin-panel-page/admin-panel-page.component';
import { JobsPageComponent } from './pages/jobs-page/jobs-page.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { JobApplicationDetailsPageComponent } from './pages/job-application-details-page/job-application-details-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RedirectComponent,
        pathMatch: 'full',
      },
      {
        path: 'user-panel',
        component: UserPanelPageComponent,
        canActivate: [RoleGuard],
        data: { authority: 'USER' },
      },
      {
        path: 'jobs',
        component: JobsPageComponent,
      },
      {
        path: 'job-details',
        component: JobDetailsPageComponent,
      },
      {
        path: 'job-application-details',
        component: JobApplicationDetailsPageComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
      {
        path: 'admin-panel',
        component: AdminPanelPageComponent,
        canActivate: [RoleGuard],
        data: { authority: 'ADMIN' },
      },
    ],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
