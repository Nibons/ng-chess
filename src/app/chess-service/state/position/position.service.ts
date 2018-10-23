import { Position, createPosition } from './position.model';

import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionStore } from './position.store';
import { BoardQuery } from 'src/app/chess-service/state/board/board.query';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';

@Injectable({ providedIn: 'root' })
export class PositionService {

  constructor(
    private positionStore: PositionStore,
    private boardQuery: BoardQuery
  ) { }

  populatePositionsFromBoard(boardId: ID): void {
    const range =
      this.boardQuery.getEntity(boardId).range;
    const list_coordinates =
      Coordinates.GetAllCoordinatesWithin(range.min, range.max);
    list_coordinates.forEach(
      coordinates => {
        const position = createPosition({ coordinates: coordinates }, boardId);
        this.add(position);
      }
    );
  }

  private add(position: Position) {
    this.positionStore.add(position);
  }

  placePiece(position: Position, pieceId: ID): void {
    this.positionStore.update(position.id, { pieceId: pieceId });
  }

}
