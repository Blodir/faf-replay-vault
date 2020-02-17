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

  private state: State = {
    games: [],
    included: [],
    players: [],
    gamePlayerStats: [],
    mapVersions: []
  }

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

  filters = []

  private pageSize = 10

  constructor (private gameService: GameService, private playerService: PlayerService) {}

  private getQuery(q?) {
    const query = {
      'page[limit]': this.pageSize,
      'sort': '-endTime',
      'include': 'playerStats,playerStats.player,mapVersion',
      ...q
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

    this.state.games = this.state.games.concat(res.data)
    this.state.included = this.state.included.concat(res.included)
    this.state.gamePlayerStats = { ...this.state.gamePlayerStats, ...gamePlayerStats}
    this.state.players = { ...this.state.players, ...players}
    this.state.mapVersions = { ...this.state.mapVersions, ...mapVersions}

    this.store$.next(this.state)
  }

  loadAll(page = 0) {
    if (page === 0) {
      this.resetState()
    }
    const query = this.getQuery({'page[offset]': page * this.pageSize})
    this.gameService.getGames(query).pipe(tap(console.log)).subscribe(this.resolver.bind(this))
  }

  changePageSize(pageSize) {
    this.pageSize = pageSize
    this.loadAll()
  }

  private resetState() {
    this.state = {
      games: [],
      included: [],
      players: [],
      gamePlayerStats: [],
      mapVersions: []
    }
  }
}
