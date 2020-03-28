import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFromNowPipe } from './pipes/time-from-now.pipe';
import { TimeDurationPipe } from './pipes/time-duration.pipe';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TooltipComponent } from './directives/tooltip/tooltip.component';

@NgModule({
  declarations: [TimeFromNowPipe, TimeDurationPipe, TooltipDirective, TooltipComponent],
  imports: [
    CommonModule
  ],
  exports: [TimeFromNowPipe, TimeDurationPipe, TooltipDirective],
  entryComponents: [TooltipComponent]
})
export class SharedModule { }
