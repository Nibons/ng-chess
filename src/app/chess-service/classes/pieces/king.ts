import { Injectable } from '@angular/core';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { PositionQuery } from 'src/app/chess-service/state/position/position.query';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { ID } from '@datorama/akita';
import { Piece } from 'src/app/chess-service/state/piece/piece.model';
import { Observable } from 'rxjs/internal/Observable';
import { Queen } from 'src/app/chess-service/classes/pieces/queen';
import { toArray } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class King extends BasePiece implements IPieceType {
  constructor(
    pieceStreamService: PieceStreamService,
    positionQuery: PositionQuery,
  ) {
    super(pieceStreamService, positionQuery);
  }
  pieceType = EPieceType.king;
  static kingThreat(piece: Piece, positionQuery: PositionQuery): Observable<ID> {
    return Queen.queenThreat(piece, positionQuery, 1);
  }
  potentialMoveLocationIdList$(piece: Piece): Observable<ID[]> {
    throw new Error('Method not implemented.');
  }
  threatLocationIdList$(piece: Piece): Observable<ID[]> {
    return King.kingThreat(piece, this.positionQuery).pipe(toArray());
  }
}
