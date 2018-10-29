import { Position, createPosition } from './position.model';

import { Injectable } from '@angular/core';
import { ID, action } from '@datorama/akita';
import { PositionStore } from './position.store';
import { BoardQuery } from 'src/app/chess-service/state/board/board.query';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';
import { PositionQuery } from 'src/app/chess-service/state/position/position.query';
import { Piece } from 'src/app/chess-service/state/piece/piece.model';

@Injectable({ providedIn: 'root' })
export class PositionService {

  constructor(
    private positionStore: PositionStore,
    private positionQuery: PositionQuery,
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


  placePieceAtCoordinates(piece: Piece): void {
    const board = this.boardQuery
      .getBoardByBoardNumberInGame(piece.gameId, piece.boardNumber);

    const position = this.positionQuery.getPositionByCoordinates(piece.coordinates, board.id);

    if (position !== undefined) {
      this.positionStore.update(position.id, { pieceId: piece.id });
    }
  }
}
