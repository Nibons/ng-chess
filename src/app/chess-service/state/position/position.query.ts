import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { PositionStore, PositionState } from './position.store';
import { Position } from './position.model';
import { map } from 'rxjs/operators';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';

@Injectable({ providedIn: 'root' })
export class PositionQuery extends QueryEntity<PositionState, Position> {
  emptyPositions$ = this.selectAll({ filterBy: position => position.pieceId === null });

  constructor(protected store: PositionStore) {
    super(store);
  }

  positionsByBoard$(boardId: ID): Observable<Position[]> {
    return this.selectAll({
      filterBy: position => position.boardId === boardId
    });
  }

  positionCountByBoard$(id: ID): Observable<number> {
    return this.selectCount(
      position => position.boardId === id
    );
  }

  emptyPositionCountByBoard$(id: ID): Observable<number> {
    return this.selectCount(
      position => position.boardId === id && position.pieceId === null
    );
  }

  positionByCoordinates$(coordinates: ICoordinates, boardId: ID): Observable<Position> {
    return this.selectAll({ filterBy: position => position.boardId === boardId })
      .pipe(
        map(positionList => positionList.filter(
          position => Coordinates.IsSameCoordinates(position.coordinates, coordinates)
        )),
        map(positionList => positionList[0])
      );
  }

}
