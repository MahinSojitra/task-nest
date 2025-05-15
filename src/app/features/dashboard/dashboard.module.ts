import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';
import { TruncateTextPipe } from 'src/app/shared/pipes/truncate-text.pipe';
import { FiltersSidebarComponent } from './components/filters-sidebar/filters-sidebar.component';
import { FormsModule } from '@angular/forms';
import { TimeRemainingPipe } from 'src/app/shared/pipes/time-remaining.pipe';
import { SkeletonTaskCardComponent } from './components/skeleton-task-card/skeleton-task-card.component';
import { ProfileOverviewComponent } from './pages/profile-overview/profile-overview.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { ActiveSessionsComponent } from './pages/active-sessions/active-sessions.component';
import { SessionCardComponent } from './components/session-card/session-card.component';
import { SkeletonSessionCardComponent } from './components/skeleton-session-card/skeleton-session-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TaskCardComponent,
    TimeAgoPipe,
    TruncateTextPipe,
    TimeRemainingPipe,
    FiltersSidebarComponent,
    SkeletonTaskCardComponent,
    AccountSettingsComponent,
    ProfileOverviewComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ActiveSessionsComponent,
    SessionCardComponent,
    SkeletonSessionCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class DashboardModule { }
