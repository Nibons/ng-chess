import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardService, BoardQuery, BoardStore } from './board';
import { GameService, GameQuery, GameStore } from './game';
import { GamesaveService, GamesaveQuery, GamesaveStore } from './gamesave';
import { PieceService, PieceQuery, PieceStore } from './piece';
import { PositionService, PositionQuery } from './position';
import { CombinedQuery } from './combined.query';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    BoardService, BoardQuery, BoardStore,
    GameService, GameQuery, GameStore,
    GamesaveService, GamesaveQuery, GamesaveStore,
    PieceService, PieceQuery, PieceStore,
    PositionService, PositionQuery, PositionQuery
  ],
  exports: [

  ],
  providers: [
    BoardService, BoardQuery, BoardStore,
    GameService, GameQuery, GameStore,
    GamesaveService, GamesaveQuery, GamesaveStore,
    PieceService, PieceQuery, PieceStore,
    PositionService, PositionQuery, PositionQuery,
    CombinedQuery
  ],
})
export class StateProviderModule { }
