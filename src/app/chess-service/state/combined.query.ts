import { Injectable } from '@angular/core';

import { PieceQuery, } from './piece/piece.query';
import { Piece } from './piece/piece.model';
import { PositionQuery } from './position/position.query';
import { BoardQuery } from './board/board.query';
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
