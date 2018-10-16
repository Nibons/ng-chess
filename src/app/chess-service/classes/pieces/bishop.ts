import { Piece } from './../../state/piece/piece.model';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { Injectable } from '@angular/core';
import { VectorLibrary } from 'src/app/chess-service/classes/vector';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { merge } from 'rxjs/operators';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';

@Injectable({ providedIn: 'root' })
export class Bishop extends BasePiece implements IPieceType {
  constructor(
    pieceStreamService: PieceStreamService,
    positionQuery: PositionQuery) {
    super(pieceStreamService, positionQuery);
  }
  pieceType = EPieceType.bishop;

  static bishopThreat(piece: Piece, positionQuery: PositionQuery, count = Number.MAX_SAFE_INTEGER): Observable<ID> {
    let mergedObservable = Observable.create();
    VectorLibrary.diagonalDirections.forEach(
      direction =>
        mergedObservable = mergedObservable.pipe(
          merge(
            positionQuery.nextPositionUntilOccupied$(piece, direction)
          )
        )
    );
    return mergedObservable;
  }
  potentialMoveLocationIDs$(piece: Piece): Observable<ID> {
    throw new Error('Method not implemented.');
  }

  threatLocationIDs$(piece: Piece): Observable<ID> {
    return Bishop.bishopThreat(piece, this.positionQuery);
  }
}
