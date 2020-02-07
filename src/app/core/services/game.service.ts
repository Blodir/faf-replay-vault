import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, Endpoint } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private api: ApiService) { }

  getGames(params): Observable<any> {
    return this.api.get(Endpoint.game, '', params)
  }
}
