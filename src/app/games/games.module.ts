import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GamesComponent } from './games.component';
import { GamesFacade } from './games.facade';
import { GameFiltersComponent } from './game-filters/game-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatListModule, MatAutocompleteModule, MatCardModule } from '@angular/material'

@NgModule({
  declarations: [
    GamesComponent,
    GameFiltersComponent
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
