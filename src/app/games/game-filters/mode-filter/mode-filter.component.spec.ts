import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeFilterComponent } from './mode-filter.component';

describe('ModeFilterComponent', () => {
  let component: ModeFilterComponent;
  let fixture: ComponentFixture<ModeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
