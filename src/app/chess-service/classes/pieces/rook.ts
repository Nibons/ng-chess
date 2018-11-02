import { Piece } from './../../state/piece/piece.model';
import { EPieceType } from './../../enums/e-piece-type.enum';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { Injectable } from '@angular/core';
import { VectorLibrary } from 'src/app/chess-service/classes/vector';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { PositionQuery } from '../../state/position';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';
import { toArray } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class Rook extends BasePiece implements IPieceType {
  constructor(
    pieceStreamService: PieceStreamService,
    public positionQuery: PositionQuery) {
    super(pieceStreamService, positionQuery);
  }
  pieceType = EPieceType.rook;

  static rookThreat(piece: Piece, positionQuery: PositionQuery, count = Number.MAX_SAFE_INTEGER): Observable<ID> {
    let vectorResultList$ = Observable.create();
    VectorLibrary.cardinalDirections.forEach(
      direction =>
        vectorResultList$ = vectorResultList$.merge(
          positionQuery.nextPositionUntilOccupied$(piece, direction)
        )
    );
    return vectorResultList$;
  }
  potentialMoveLocationIdList$(piece: Piece): Observable<ID[]> {
    throw new Error('Method not implemented.');
  }

  threatLocationIdList$(piece: Piece): Observable<ID[]> {
    return Rook.rookThreat(piece, this.positionQuery).pipe(
      toArray()
    );
  }
}
