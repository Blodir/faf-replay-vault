import { Component, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'faf-mode-filter',
  templateUrl: './mode-filter.component.html',
  styleUrls: ['./mode-filter.component.scss']
})
export class ModeFilterComponent implements OnInit {
  modeControl = new FormControl()

  @Input() set ladderOnly(val: boolean) {
    this.modeControl.setValue(val, {emitEvent: false});
  }

  @Output() filter = this.modeControl.valueChanges;

  constructor() { }

  ngOnInit() {
  }

}
