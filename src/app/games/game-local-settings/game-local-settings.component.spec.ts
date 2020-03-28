import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLocalSettingsComponent } from './game-local-settings.component';

describe('GameLocalSettingsComponent', () => {
  let component: GameLocalSettingsComponent;
  let fixture: ComponentFixture<GameLocalSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLocalSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLocalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
