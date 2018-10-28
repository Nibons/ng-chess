import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { PositionStore, PositionState } from './position.store';
import { Position } from './position.model';
import { map, mergeMap, takeWhile, tap, filter, take } from 'rxjs/operators';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { Coordinates } from 'src/app/chess-service/classes/coordinates';
import { Piece } from 'src/app/chess-service/state/piece';
import { getEntityByObservableId$ } from 'src/app/chess-service/state/shared/shared.query';

@Injectable({ providedIn: 'root' })
export class PositionQuery extends QueryEntity<PositionState, Position> {
  emptyPositions$ = this.selectAll({ filterBy: position => position.pieceId === null });

  constructor(protected store: PositionStore) {
    super(store);
  }

  positionById$(positionId$: Observable<ID>): Observable<Position> {
    return getEntityByObservableId$(this.selectAll(), positionId$);
  }

  positionsByBoard$(boardId: ID): Observable<Position> {
    return this.selectAll({
      filterBy: position => position.boardId === boardId
    }).pipe(
      mergeMap(positionList => from(positionList))
    );
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

  selectPositionByCoordinates$(coordinates: ICoordinates, boardId: ID): Observable<Position> {
    return this.positionsByBoard$(boardId).pipe(
      filter(position => Coordinates.IsSameCoordinates(position.coordinates, coordinates)),
      take(1)
    );
  }

  getPositionByCoordinates(coordinates: ICoordinates, boardId: ID): Position | undefined {
    return this.getAll()
      .filter(p => p.boardId === boardId)
      .find(p => Coordinates.IsSameCoordinates(coordinates, p.coordinates));
  }

  deltaPosition$(
    position: Position,
    direction: ICoordinates,
    boardID: ID
  ): Observable<Position> {
    const new_coords = Coordinates.GetDelta(position.coordinates, direction);
    return this.selectPositionByCoordinates$(new_coords, boardID);
  }

  isEmpty$(
    coordinates: ICoordinates,
    boardId: ID
  ): Observable<boolean> {
    return this.selectPositionByCoordinates$(coordinates, boardId)
      .pipe(
        map(position => position.pieceId !== null)
      );
  }

  nextPositionUntilOccupied$(
    { coordinates, boardNumber }: Piece,
    direction: ICoordinates,
    max: number = Number.MAX_SAFE_INTEGER
  ): Observable<Position> {
    let still_empty = true;
    return Coordinates.GetCoordinatesInDirection$(coordinates, direction)
      .pipe(
        mergeMap(coord => this.selectPositionByCoordinates$(coord, boardNumber)),
        takeWhile(() => still_empty),
        tap(position => still_empty = position.pieceId !== null),
        take(max)
      );
  }
}
