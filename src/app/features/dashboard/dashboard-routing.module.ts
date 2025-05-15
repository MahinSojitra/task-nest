import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ProfileOverviewComponent } from './pages/profile-overview/profile-overview.component';
import { ActiveSessionsComponent } from './pages/active-sessions/active-sessions.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'account',
    component: AccountSettingsComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileOverviewComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'manage-password', component: ChangePasswordComponent },
      { path: 'active-sessions', component: ActiveSessionsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
