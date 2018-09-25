import { Board } from './board.model';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { BoardStore } from './board.store';
import { PieceQuery } from 'src/app/chess-service/state/piece';

@Injectable({ providedIn: 'root' })
export class BoardService {

  constructor(private boardStore: BoardStore) { }

  add(board: Board) {
    this.boardStore.add(board);
  }

  OnAllPositionsPlaced(board: Board) {
    this.boardStore.update(board.id, { positionsPlaced: true });
  }

  OnAllPiecesPlaced(board: Board) {
    this.boardStore.update(board.id, { piecesPlaced: true });
  }

}
