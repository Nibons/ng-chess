import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardService, BoardQuery, BoardStore } from './board';
import { GameService, GameQuery, GameStore } from './game';
import { GamesaveService, GamesaveQuery, GamesaveStore } from './gamesave';
import { PieceService, PieceQuery, PieceStore } from './piece';
import { PositionService, PositionQuery, PositionStore } from './position';
import { CombinedQuery } from './combined.query';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CombinedQuery,
    BoardService, BoardQuery, BoardStore,
    GameService, GameQuery, GameStore,
    GamesaveService, GamesaveQuery, GamesaveStore,
    PieceService, PieceQuery, PieceStore,
    PositionService, PositionQuery, PositionStore
  ],
})
export class StateProviderModule { }
