import { Injectable } from '@angular/core';
import { BoardStore } from 'src/app/chess-service/state/board/board.store';
import { GameStore } from 'src/app/chess-service/state/game/game.store';
import { GamesaveStore } from 'src/app/chess-service/state/gamesave/gamesave.store';
import { PieceStore } from 'src/app/chess-service/state/piece/piece.store';
import { PositionStore } from 'src/app/chess-service/state/position/position.store';

@Injectable({ providedIn: 'root' })
export class CombinedStore {
  constructor(
    public boardStore: BoardStore,
    public gameStore: GameStore,
    public gameSaveStore: GamesaveStore,
    public pieceStore: PieceStore,
    public positionStore: PositionStore
  ) { }
}
