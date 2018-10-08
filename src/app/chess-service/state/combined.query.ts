import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { Observable, from, of } from 'rxjs';
import { getEntityByObservableId$ } from 'src/app/chess-service/state/shared/shared.query';
import { mergeMap, map } from 'rxjs/operators';
import { PieceQuery } from 'src/app/chess-service/state/piece';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { BoardQuery } from 'src/app/chess-service/state/board';

@Injectable({ providedIn: 'root' })
export class CombinedQuery {

  constructor(
    private boardQuery: BoardQuery,
    private piecesQuery: PieceQuery,
    private positionQuery: PositionQuery
  ) { }
}
