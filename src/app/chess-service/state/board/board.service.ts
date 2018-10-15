import { Board } from './board.model';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { BoardStore } from './board.store';
import { PositionService } from 'src/app/chess-service/state/position/position.service';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';
import { createPosition } from 'src/app/chess-service/state/position/position.model';

@Injectable({ providedIn: 'root' })
export class BoardService {

  constructor(
    private boardStore: BoardStore,
    @Inject(forwardRef(() => PositionService)) private positionService: PositionService
  ) { }

  add(board: Board) {
    this.boardStore.add(board);
    Coordinates.GetAllCoordinatesWithin(board.range.min, board.range.max).forEach(
      coordinates =>
        this.positionService.add(createPosition({ coordinates: coordinates }, board.id))
    );
    this.OnAllPositionsPlaced(board);
  }

  OnAllPositionsPlaced(board: Board) {
    this.boardStore.update(board.id, { positionsPlaced: true });
  }

  OnAllPiecesPlaced(board: Board) {
    this.boardStore.update(board.id, { piecesPlaced: true });
  }

}
