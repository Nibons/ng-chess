import { Injectable } from '@angular/core';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { Piece } from 'src/app/chess-service/state/piece';
import { Observable, merge } from 'rxjs';
import { ID } from '@datorama/akita';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';
import { map } from 'rxjs/operators';

const KnightTargets: ICoordinates[] = [];

@Injectable({ providedIn: 'root' })
export class Knight extends BasePiece implements IPieceType {
  constructor(
    pieceStreamService: PieceStreamService,
    positionQuery: PositionQuery,
  ) {
    super(pieceStreamService, positionQuery);
  }
  pieceType = EPieceType.knight;

  static knightThreat(piece: Piece, positionQuery: PositionQuery): Observable<ID> {
    let mergedObservable = Observable.create();
    KnightTargets.forEach(
      targetDirection => {
        const targetPosition = Coordinates.GetDelta(piece.coordinates, targetDirection);
        const pQuery = positionQuery.selectPositionByCoordinates(targetPosition, piece.boardNumber)
          .pipe(map(position => position.id));
        mergedObservable = mergedObservable.pipe(merge(pQuery));
      }
    );
    return mergedObservable;
  }
  potentialMoveLocationIDs$(piece: Piece): Observable<ID> {
    throw new Error('Method not implemented.');
  }

  threatLocationIDs$(piece: Piece): Observable<ID> {
    return Knight.knightThreat(piece, this.positionQuery);
  }
}
