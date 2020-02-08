import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersFilterComponent } from './players-filter.component';

describe('PlayersFilterComponent', () => {
  let component: PlayersFilterComponent;
  let fixture: ComponentFixture<PlayersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
