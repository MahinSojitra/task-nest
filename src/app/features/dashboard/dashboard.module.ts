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
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TaskCardComponent,
    TimeAgoPipe,
    TruncateTextPipe,
    TimeRemainingPipe,
    FiltersSidebarComponent,
    SkeletonTaskCardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
