import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GamesComponent } from './games.component';
import { GamesFacade } from './games.facade';
import { GameFiltersComponent } from './game-filters/game-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatListModule, MatAutocompleteModule, MatCardModule } from '@angular/material';
import { PlayersFilterComponent } from './game-filters/players-filter/players-filter.component'
import { SharedModule } from '../shared/shared.module';
import { GameCardComponent } from './game-card/game-card.component';
import { MapFilterComponent } from './game-filters/map-filter/map-filter.component';
import { RatingFilterComponent } from './game-filters/rating-filter/rating-filter.component';
import { ModeFilterComponent } from './game-filters/mode-filter/mode-filter.component';
import { GameLocalSettingsComponent } from './game-local-settings/game-local-settings.component';
import { RenderRatingChangePipe } from './game-card/render-rating-change.pipe';

@NgModule({
  declarations: [
    GamesComponent,
    GameFiltersComponent,
    PlayersFilterComponent,
    GameCardComponent,
    MapFilterComponent,
    RatingFilterComponent,
    ModeFilterComponent,
    GameLocalSettingsComponent,
    RenderRatingChangePipe
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  exports: [
    GamesComponent
  ],
  providers: [
    GamesFacade
  ]
})
export class GamesModule { }
