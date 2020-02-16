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
  games$: Observable<any[]>

  private currentPage = 0

  constructor(private facade: GamesFacade) { }

  ngOnInit() {
    this.games$ = this.facade.games$
    this.facade.loadAll()
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
}
