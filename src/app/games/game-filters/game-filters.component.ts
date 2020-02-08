import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms'
import { Subject } from 'rxjs';
import { debounceTime, switchMap, startWith, map, tap, filter } from 'rxjs/operators';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'faf-game-filters',
  templateUrl: './game-filters.component.html',
  styleUrls: ['./game-filters.component.scss']
})
export class GameFiltersComponent implements OnInit {
  private subject = new Subject<string[]>()
  @Input('filters') filters = []
  @Output('filters') filtersOut = this.subject.asObservable()

  filterForm

  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      'filter-string': ''
    })
  }

  ngOnInit() {
  }

  onFormAddFilter(form) {
    this.filters.push(form['filter-string'])
    this.subject.next(this.filters)
  }

  onRemoveFilter(idx) {
    this.filters.splice(idx, 1)
    this.subject.next(this.filters)
  }

  updateFilter(filter: string, type: string) {
    const filterIndex = this.filters.findIndex((filter: string) => filter.includes(type))
    if (filterIndex >= 0) {
      this.filters[filterIndex] = filter
    } else {
      this.filters.push(filter)
    }
    this.subject.next(this.filters)
  }

  getFilteredPlayerIds() {
    const filter: string = this.filters.find((filter: string) => filter.includes('playerStats.player.id'))
    if (filter) {
      const regex = /playerStats.player.id==(\d*)/g
      let matches, output = [];
      while (matches = regex.exec(filter)) {
          output.push(matches[1]);
      }
      return output
    }
    return []
  }
}
