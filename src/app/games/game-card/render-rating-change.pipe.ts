import { Pipe, PipeTransform } from '@angular/core';
import { RatingChange } from './game-card.component';

@Pipe({
  name: 'renderRatingChange'
})
export class RenderRatingChangePipe implements PipeTransform {

  transform(value: RatingChange, showChange: boolean): string {
    if (!showChange) return value.before
    return value.before + '' + value.change;
  }

}
