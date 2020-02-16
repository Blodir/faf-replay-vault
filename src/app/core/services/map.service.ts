import { Injectable } from '@angular/core';
import { ApiService, Endpoint } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private api: ApiService) { }

  getMapAutocomplete(name: string) {
    return this.api.get(Endpoint.map, '', {
      'page[limit]': 5,
      'filter[map]': "displayName=ge='" + name + "'"
    })
  }
}
