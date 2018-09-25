import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { PositionStore, PositionState } from './position.store';
import { Position } from './position.model';
import { count } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PositionQuery extends QueryEntity<PositionState, Position> {
  emptyPositions$ = this.selectAll({ filterBy: position => position.piece === null });

  constructor(protected store: PositionStore) {
    super(store);
  }

  positionsByBoard(id: ID): Observable<Position[]> {
    return this.selectAll({
      filterBy: position => position.board === id
    });
  }

  positionCountByBoard$(id: ID): Observable<number> {
    return this.selectCount(
      position => position.board === id
    );
  }

  emptyPositionCountByBoard$(id: ID): Observable<number> {
    return this.selectCount(
      position => position.board === id && position.piece === null
    );
  }

}
