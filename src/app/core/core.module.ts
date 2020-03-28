import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { GameService } from './services/game.service';
import { LocalSettingsService } from './services/local-settings.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    GameService,
    LocalSettingsService
  ]
})
export class CoreModule { }
