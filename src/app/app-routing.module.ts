import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';

const routes: Routes = [
  // Redirect to dashboard by default
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },

  // Main application routes
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      // {
      //   path: 'tasks',
      //   loadChildren: () =>
      //     import('./features/tasks/tasks.module').then(m => m.TasksModule),
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () =>
      //     import('./features/settings/settings.module').then(m => m.SettingsModule),
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('./features/profile/profile.module').then(m => m.ProfileModule),
      // },
    ],
  },

  // Wildcard route (404)
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
