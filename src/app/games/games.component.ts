import { Component, OnInit } from '@angular/core';
import { GamesFacade } from './games.facade';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'faf-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games$

  private currentPage = 0

  constructor(private facade: GamesFacade) { }

  ngOnInit() {
    this.games$ = this.facade.games$
    this.facade.loadAll()
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

  getRatingChange$(playerStatsId): Observable<string> {
    return this.facade.gamePlayerStats$.pipe(
      map(stats => stats[playerStatsId]),
      map(stats => {
        const attrs = stats.attributes
        const before = attrs.beforeMean - 3 * attrs.beforeDeviation
        const after = (attrs.afterMean || attrs.beforeMean) - 3 * (attrs.afterDeviation || attrs.beforeDeviation)
        const change = Math.round(after - before)
        let str = ''
        change > 0 ? str = ' +' : str = ' '
        return Math.round(before) + str + change
      }),
      catchError((err) => of('N/A'))
    )
  }

  getMapVersion$(id): Observable<any> {
    return this.facade.mapVersions$.pipe(
      map(maps => maps[id])
    )
  }

  getFilters() {
    return this.facade.filters
  }

  updateFilters(filters) {
    this.currentPage = 0
    this.facade.filters = filters
    this.facade.loadAll()
  }

  loadMore() {
    this.currentPage++
    this.facade.loadAll(this.currentPage)
  }

  changePageSize(pageSize) {
    this.facade.changePageSize(pageSize)
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
}
