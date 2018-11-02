import { Injectable } from '@angular/core';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { PositionQuery } from 'src/app/chess-service/state/position/position.query';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { ID } from '@datorama/akita';
import { Piece } from 'src/app/chess-service/state/piece/piece.model';
import { Observable } from 'rxjs/internal/Observable';
import { VectorLibrary } from 'src/app/chess-service/classes/vector';
import { merge, toArray } from 'rxjs/operators';
import { Rook } from 'src/app/chess-service/classes/pieces/rook';
import { Bishop } from 'src/app/chess-service/classes/pieces/bishop';

@Injectable({ providedIn: 'root' })
export class Queen extends BasePiece implements IPieceType {

  constructor(
    pieceStreamService: PieceStreamService,
    positionQuery: PositionQuery,
  ) {
    super(pieceStreamService, positionQuery);
  }
  pieceType = EPieceType.queen;
  static queenThreat(piece: Piece, positionQuery: PositionQuery, count = Number.MAX_SAFE_INTEGER): Observable<ID> {
    return Observable.create().pipe(
      merge(
        Rook.rookThreat(piece, positionQuery, count),
        Bishop.bishopThreat(piece, positionQuery, count)
      )
    );
  }
  threatLocationIdList$(piece: Piece): Observable<ID[]> {
    return Queen.queenThreat(piece, this.positionQuery).pipe(
      toArray()
    );
  }
  potentialMoveLocationIdList$(piece: Piece): Observable<ID[]> {
    throw new Error('Method not implemented.');
  }
}
