import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalSettingsService } from 'src/app/core/services/local-settings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'faf-game-local-settings',
  templateUrl: './game-local-settings.component.html',
  styleUrls: ['./game-local-settings.component.scss']
})
export class GameLocalSettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  showResultControl = new FormControl()

  constructor(private localSettingsService: LocalSettingsService) { }

  ngOnInit() {
    this.showResultControl.setValue(this.localSettingsService.get("showResult"));
    this.showResultControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((val: boolean) => {
      this.localSettingsService.set("showResult", val);
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
