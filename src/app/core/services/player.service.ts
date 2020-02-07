import { Injectable } from '@angular/core';
import { ApiService, Endpoint } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private api: ApiService) { }

  getPlayer(id: string, params?) {
    return this.api.get(Endpoint.player, id, params)
  }

  getPlayerAutocomplete(login: string) {
    return this.api.get(Endpoint.player, '', {
      'page[limit]': 5,
      'filter[player]': 'login=ge=' + login
    })
  }
}
