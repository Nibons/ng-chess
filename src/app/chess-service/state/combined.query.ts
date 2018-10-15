import { Injectable } from '@angular/core';

import { PieceQuery, Piece } from './piece';
import { PositionQuery } from './position';
import { BoardQuery } from './board';
import { ID } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CombinedQuery {

  constructor(
    protected pieceQuery: PieceQuery,
    protected positionQuery: PositionQuery,
    protected boardQuery: BoardQuery
  ) { }

  getBoardIdFromPiece(piece: Piece): Observable<ID> {
    return this.boardQuery.selectBoardsInGame(piece.gameId)
      .pipe(
        map(boardList => boardList[piece.boardNumber]),
        map(board => board.id)
      );
  }
}
