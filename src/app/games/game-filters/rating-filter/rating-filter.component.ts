import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'faf-rating-filter',
  templateUrl: './rating-filter.component.html',
  styleUrls: ['./rating-filter.component.scss']
})
export class RatingFilterComponent implements OnInit {
  ratingControl = new FormControl()

  @Output() filter = this.ratingControl.valueChanges.pipe(
    debounceTime(500),
    filter((val) => {
      if (typeof val === 'string') {
        return true
      } else {
        return false
      }
    }),
    map((val) => {
      if (val.length === 0) {
        return ""
      }
      return "playerStats.player.ladder1v1Rating.rating=gt=" + parseInt(val)
    })
  )

  constructor() { }

  ngOnInit() {

  }

}
