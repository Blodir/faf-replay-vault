import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms'
import { Subject, Observable } from 'rxjs';
import { debounceTime, switchMap, startWith, map, tap, filter } from 'rxjs/operators';
import { PlayerService } from 'src/app/core/services/player.service';

export interface GameFilter {
  ladderOnly?: string
  ladder1v1Rating?: string
  mapVersionId?: string
  playerId?: string
}

export type GameFilterKey = keyof GameFilter

@Component({
  selector: 'faf-game-filters',
  templateUrl: './game-filters.component.html',
  styleUrls: ['./game-filters.component.scss']
})
export class GameFiltersComponent implements OnInit {
  private subject = new Subject<GameFilter>()
  @Input('filters') filters: GameFilter = {}
  @Output('filters') filtersOut: Observable<GameFilter> = this.subject.asObservable()

  filterForm

  constructor() {}

  ngOnInit() {
  }

  onRemoveFilter(key) {
    delete this.filters[key]
    this.subject.next(this.filters)
  }

  updateFilter(key: GameFilterKey, value: string) {
    if (this.filters[key] && value.length === 0) {
      delete this.filters[key]
    } else {
      this.filters[key] = value
    }
    this.subject.next(this.filters)
  }

  getLadderOnlyFilter() {
    return this.filters['ladderOnly'] && this.filters['ladderOnly'].includes('playerStats.ratingChanges.leaderboard.id=in=("2")');
  }

  setLadderOnlyFilter(val: boolean) {
    this.updateFilter('ladderOnly', val ? 'playerStats.ratingChanges.leaderboard.id=in=("2")' : '');
  }
}
