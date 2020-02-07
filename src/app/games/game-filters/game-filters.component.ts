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
  playerAutoControl = new FormControl()
  playerAutoOptions$

  constructor(private formBuilder: FormBuilder, private playerService: PlayerService) {
    this.filterForm = this.formBuilder.group({
      'filter-string': ''
    })
  }

  ngOnInit() {
    this.playerAutoOptions$ = this.playerAutoControl.valueChanges.pipe(
      tap(console.log),
      filter((val) => {
        if (val && val.attributes) {
          this.filters.push('playerStats.player.id==' + val.id)
          this.subject.next(this.filters)
          return false
        }
        return val
      }),
      debounceTime(500),
      switchMap((val) => this.playerService.getPlayerAutocomplete(val && val.attributes ? val.attributes.login : val)),
      map((res: any) => res.data)
    )
  }

  displayFn(user) {
    return user && user.attributes ? user.attributes.login : user
  }

  onAddFilter(form) {
    this.filters.push(form['filter-string'])
    this.subject.next(this.filters)
  }

  onRemoveFilter(idx) {
    this.filters.splice(idx, 1)
    this.subject.next(this.filters)
  }
}
