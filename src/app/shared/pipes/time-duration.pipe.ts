import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeDuration'
})
export class TimeDurationPipe implements PipeTransform {

  transform(startDate: any, endDate: any): any {
    return moment.duration(moment(endDate).diff(moment(startDate))).humanize()
  }

}
