import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MapService } from 'src/app/core/services/map.service';
import { filter, debounceTime, switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'faf-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})
export class MapFilterComponent implements OnInit {
  private subject = new Subject<string>()
  @Input() mapId = ''
  @Output('filter') filterOut = this.subject.asObservable()

  mapAutoControl = new FormControl()
  mapAutoOptions$

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapAutoOptions$ = this.mapAutoControl.valueChanges.pipe(
      filter((val) => {
        if (val && val.attributes) {
          this.emit(val.id)
          this.mapAutoControl.setValue(undefined)
          return false
        }
        return val
      }),
      debounceTime(500),
      switchMap((val) => this.mapService.getMapAutocomplete(val && val.attributes ? val.attributes.displayName : val)),
      map((res: any) => res.data),
      tap(console.log)
    )
  }

  displayFn(map) {
    return map && map.attributes ? map.attributes.displayName : map
  }

  emit(mapId) {
    if (mapId) {
      this.subject.next('mapVersion.map.id==' + mapId)
    } else {
      this.subject.next()
    }
  }
}
