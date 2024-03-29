import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GamesFacade } from './games.facade';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, catchError, takeUntil, skip } from 'rxjs/operators';
import { GameFilter } from './game-filters/game-filters.component';

@Component({
  selector: 'faf-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  unsubscribe$ = new Subject<void>()
  games$: Observable<any[]>

  loading = false

  private currentPage = 0

  constructor(private facade: GamesFacade, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.games$ = this.facade.games$
    this.games$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.loading = false)
    this.route.queryParams.pipe(skip(1), takeUntil(this.unsubscribe$)).subscribe((params) => {
      this.currentPage = 0
      if (params.filter) {
        this.facade.filters = params.filter.split(';')
      } else {
        this.facade.filters = []
      }
      this.loading = true
      this.facade.loadAll()
    })
    if (!this.route.snapshot.queryParams['filter']) {
      this.router.navigate([], {
        queryParams: {
          filter: 'playerStats.ratingChanges.leaderboard.id=in=("2");playerStats.player.ladder1v1Rating.rating=gt=2000'
        }
      })
    }
  }

  getFilters(): GameFilter {
    const out: GameFilter = {}
    this.facade.filters.forEach((filter: string) => {
      if (filter.includes('playerStats.player.id')) {
        out.playerId = filter
      } else if (filter.includes('playerStats.ratingChanges.leaderboard.id=in=("2")')) {
        out.ladderOnly = filter
      } else if (filter.includes('playerStats.player.ladder1v1Rating')) {
        out.ladder1v1Rating = filter
      } else if (filter.includes('mapVersion.map.id')) {
        out.mapVersionId = filter
      }
    })
    return out
  }

  updateFilters(filters: GameFilter) {
    let params: any = {}
    const vals = Object.values(filters)
    if (vals.length > 0) params.filter = vals.join(';')
    this.router.navigate([], {
      queryParams: { ...params }
    })
  }

  loadMore() {
    this.currentPage++
    this.facade.loadAll(this.currentPage)
  }

  changePageSize(pageSize) {
    this.facade.changePageSize(pageSize)
  }

  reload() {
    this.loading = true;
    this.facade.loadAll(0);
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
