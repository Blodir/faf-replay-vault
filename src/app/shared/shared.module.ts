import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFromNowPipe } from './pipes/time-from-now.pipe';
import { TimeDurationPipe } from './pipes/time-duration.pipe';



@NgModule({
  declarations: [TimeFromNowPipe, TimeDurationPipe],
  imports: [
    CommonModule
  ],
  exports: [TimeFromNowPipe, TimeDurationPipe]
})
export class SharedModule { }
