import { Component, OnInit } from '@angular/core';
import { GameService } from './core/services/game.service';
import { Observable, forkJoin, from, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, distinctUntilChanged } from 'rxjs/operators'
import { PlayerService } from './core/services/player.service';

interface State {
  games: any
  included: any
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
}
