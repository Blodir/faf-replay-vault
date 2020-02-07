import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'https://api.faforever.com/';
const token = '';

export enum Endpoint {
  'game' = 'data/game',
  'player' = 'data/player'
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  get(endpoint: Endpoint, path = '', params?) {
    return this.http.get(url + endpoint + '/' + path, { params })
  }
}
