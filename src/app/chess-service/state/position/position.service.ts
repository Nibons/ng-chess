import { Position, createPosition } from './position.model';

import { Injectable } from '@angular/core';
import { ID, action, applyTransaction } from '@datorama/akita';
import { PositionStore } from './position.store';
import { BoardQuery } from 'src/app/chess-service/state/board/board.query';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';

@Injectable({ providedIn: 'root' })
export class PositionService {

  constructor(
    private positionStore: PositionStore,
    private boardQuery: BoardQuery
  ) { }

  @action({ type: 'Populate Board Positions' })
  populatePositionsFromBoard(boardId: ID): void {
    const range =
      this.boardQuery.getEntity(boardId).range;
    const list_coordinates =
      Coordinates.GetAllCoordinatesWithin(range.min, range.max);
    const position_list: Position[] = [];
    list_coordinates.forEach(
      coordinates => {
        position_list.push(
          createPosition({ coordinates: coordinates }, boardId)
        );
      }
    );
    this.positionStore.add(position_list);
  }

  private add(position: Position) {
    this.positionStore.add(position);
  }

  placePiece(position: Position, pieceId: ID): void {
    this.positionStore.update(position.id, { pieceId: pieceId });
  }

}
