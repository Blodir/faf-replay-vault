import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GamesComponent } from './games.component';
import { GamesFacade } from './games.facade';
import { GameFiltersComponent } from './game-filters/game-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatListModule, MatAutocompleteModule, MatCardModule } from '@angular/material';
import { PlayersFilterComponent } from './game-filters/players-filter/players-filter.component'

@NgModule({
  declarations: [
    GamesComponent,
    GameFiltersComponent,
    PlayersFilterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatAutocompleteModule,
    MatCardModule
  ],
  exports: [
    GamesComponent
  ],
  providers: [
    GamesFacade
  ]
})
export class GamesModule { }
