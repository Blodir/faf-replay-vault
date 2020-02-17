import { Component, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'faf-mode-filter',
  templateUrl: './mode-filter.component.html',
  styleUrls: ['./mode-filter.component.scss']
})
export class ModeFilterComponent implements OnInit {
  modeControl = new FormControl()

  @Input() set featuredMod(val: string) {
    if (val && val.includes('6')) {
      this.modeControl.setValue(true, {emitEvent: false})
    } else {
      this.modeControl.setValue(false, {emitEvent: false})
    }
  }

  @Output() filter = this.modeControl.valueChanges.pipe(
    map((val) => val ? 'featuredMod.id==6' : '')
  )

  constructor() { }

  ngOnInit() {
  }

}
