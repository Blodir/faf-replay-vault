import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { GameService } from '../core/services/game.service';
import { PlayerService } from '../core/services/player.service';

interface State {
  games: any[]
  included: any[]
  players: Object
  gamePlayerStats: Object
  mapVersions: Object
}

@Injectable()
export class GamesFacade {
  private store$ = new BehaviorSubject<State>({
    games: [],
    included: [],
    players: [],
    gamePlayerStats: [],
    mapVersions: []
  })

  games$ = this.store$.pipe(
    map(state => state.games),
    distinctUntilChanged()
  )
  included$ = this.store$.pipe(
    map(state => state.included),
    distinctUntilChanged()
  )
  players$ = this.store$.pipe(
    map(state => state.players),
    distinctUntilChanged()
  )
  gamePlayerStats$ = this.store$.pipe(
    map(state => state.gamePlayerStats),
    distinctUntilChanged()
  )
  mapVersions$ = this.store$.pipe(
    map(state => state.mapVersions),
    distinctUntilChanged()
  )

  filters = [
    'featuredMod.id==6',
    'playerStats.player.ladder1v1Rating.rating=gt=2000'
  ]

  constructor (private gameService: GameService, private playerService: PlayerService) {}

  private getQuery() {
    const query = {
      'page[limit]': 5,
      'sort': '-endTime',
      'include': 'playerStats,playerStats.player,mapVersion',
    }
    if (this.filters.length > 0) query['filter'] = this.filters.join(';')
    return query
  }

  private resolver(res) {
    const gamePlayerStats = {}
    const players = {}
    const mapVersions = {}
    res.included.filter(i => i.type === "gamePlayerStats").forEach(stats => gamePlayerStats[stats.id] = stats)
    res.included.filter(i => i.type === "player").forEach(player => players[player.id] = player)
    res.included.filter(i => i.type === "mapVersion").forEach(map => mapVersions[map.id] = map)

    this.store$.next({
      games: res.data,
      included: res.included,
      gamePlayerStats,
      players,
      mapVersions
    })
  }

  loadAll() {
    this.gameService.getGames(this.getQuery()).pipe(tap(console.log)).subscribe(this.resolver.bind(this))
  }
}
