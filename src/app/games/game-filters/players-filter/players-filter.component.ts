import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';
import { tap, filter, debounceTime, switchMap, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'faf-players-filter',
  templateUrl: './players-filter.component.html',
  styleUrls: ['./players-filter.component.scss']
})
export class PlayersFilterComponent implements OnInit {
  private subject = new Subject<string>()
  @Input() playerId = ''
  @Output('playerId') playerIdOut = this.subject.asObservable()

  playerAutoControl = new FormControl()
  playerAutoOptions$

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerAutoOptions$ = this.playerAutoControl.valueChanges.pipe(
      filter((val) => {
        if (val && val.attributes) {
          this.addFilter(val.id)
          this.playerAutoControl.setValue(undefined)
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

  private addFilter(playerId: string) {
    this.playerId = playerId
    this.emit(playerId)
  }

  private emit(playerId) {
    if (!playerId) {
      this.subject.next()
      return
    }
    this.subject.next('playerStats.player.id==' + playerId)
  }
}
