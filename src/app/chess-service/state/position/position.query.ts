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

  selectPositionsByBoard(boardId: ID): Observable<Position> {
    return this.selectAll().pipe(
      mergeMap(list => from(list)),
      filter(position => position.boardId === boardId)
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

  selectPositionByCoordinates(coordinates: ICoordinates, boardId: ID): Observable<Position> {
    return this.selectPositionsByBoard(boardId).pipe(
      filter(position => Coordinates.IsSameCoordinates(position.coordinates, coordinates))
    );
  }

  getPositionsOnBoard(boardId: ID): Position[] {
    return this.getAll()
      .filter(position => position.boardId === boardId);
  }

  getPositionByCoordinates(coordinates: ICoordinates, boardId: ID): Position | undefined {
    const positions_on_board = this.getPositionsOnBoard(boardId);
    return positions_on_board
      .find(p => Coordinates.IsSameCoordinates(coordinates, p.coordinates));
  }

  getPieceAtCoordinates(coordinates: ICoordinates, boardId: ID): ID | undefined {
    const position = this.getPositionByCoordinates(coordinates, boardId);
    if (position !== undefined) {
      const pieceId = position.pieceId;
      if (pieceId !== null) {
        return pieceId;
      } else { return undefined; }
    } else { return position; }
  }

  deltaPosition$(
    position: Position,
    direction: ICoordinates,
    boardID: ID
  ): Observable<Position> {
    const new_coords = Coordinates.GetDelta(position.coordinates, direction);
    return this.selectPositionByCoordinates(new_coords, boardID);
  }

  isEmpty$(
    coordinates: ICoordinates,
    boardId: ID
  ): Observable<boolean> {
    return this.selectPositionByCoordinates(coordinates, boardId)
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
        mergeMap(coord => this.selectPositionByCoordinates(coord, boardNumber)),
        takeWhile(() => still_empty),
        tap(position => still_empty = position.pieceId !== null),
        take(max)
      );
  }

  selectIsOccupiedCoordinates(coordinates: ICoordinates, boardId: ID): Observable<boolean> {
    return this.selectPositionByCoordinates(coordinates, boardId).pipe(
      map(position => position.pieceId !== undefined)
    );
  }
}
