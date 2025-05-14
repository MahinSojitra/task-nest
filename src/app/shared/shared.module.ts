import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeRemainingPipe } from './pipes/time-remaining.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    TimeRemainingPipe,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
