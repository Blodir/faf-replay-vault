import { Component, OnInit, Input } from '@angular/core';
import { GamesFacade } from '../games.facade';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { LocalSettingsService } from 'src/app/core/services/local-settings.service';
import * as moment from 'moment';

export interface RatingChange {
  before
  after
  change
}

@Component({
  selector: 'faf-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game

  constructor(private facade: GamesFacade, private localSettingsService: LocalSettingsService) { }

  ngOnInit() {
  }

  doShowResults(): boolean {
    return this.localSettingsService.get("showResult");
  }

  getPlayer$(playerStatsId): Observable<any> {
    return this.facade.gamePlayerStats$.pipe(
      map(stats => stats[playerStatsId].relationships.player.data.id),
      switchMap(id => this.facade.players$.pipe(
        map(players => players[id])
      )),
      catchError((err) => of({attributes: {login: ''}}))
    )
  }

  getRatingChange$(playerStatsId): Observable<RatingChange> {
    return this.facade.gamePlayerStats$.pipe(
      map(stats => stats[playerStatsId]),
      map(stats => {
        const attrs = stats.attributes
        const before = attrs.beforeMean - 3 * attrs.beforeDeviation
        const after = (attrs.afterMean || attrs.beforeMean) - 3 * (attrs.afterDeviation || attrs.beforeDeviation)
        const change = Math.round(after - before)
        let str = ''
        change > 0 ? str = ' +' : str = ' '
        return {
          before: Math.round(before),
          after: Math.round(after),
          change: str + change
        }
      }),
      catchError((err) => of({before: 0, after: 0, change: 'N/A'}))
    )
  }

  getMapVersion$(id): Observable<any> {
    return this.facade.mapVersions$.pipe(
      map(maps => maps[id])
    )
  }

  getFactionLogoPath(playerStatsId) {
    const base_path = 'assets/images/'
    return this.facade.gamePlayerStats$.pipe(
      map(stats => stats[playerStatsId]),
      map(stats => {
        switch(stats.attributes.faction || 1) {
          case 1:
            return base_path + 'uef_small.png'
          case 2:
            return base_path + 'aeon_small.png'
          case 3:
            return base_path + 'cybran_small.png'
          case 4:
            return base_path + 'seraphim_small.png'
        }
      }),
      catchError((err) => of('uef_small.png'))
    )
  }

  getGameDuration() {
    const start = new Date(this.game.attributes.startTime)
    const end = new Date(this.game.attributes.endTime)
    // @ts-ignore
    const diff = end - start
    return Math.round(diff / 1000 / 60)
  }

  getFullEndTime() {
    return moment(this.game.attributes.endTime).toLocaleString();
  }
}
