import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { BoardStore, BoardState } from './board.store';
import { Board } from './board.model';
import { Observable } from 'rxjs';
import { getEntityByObservableId$ } from 'src/app/chess-service/state/shared/shared.query';
import { map } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';

@Injectable({ providedIn: 'root' })
export class BoardQuery extends QueryEntity<BoardState, Board> {
  incompleteBoards$ = this.selectAll({ filterBy: board => !!board.positionsPlaced });

  constructor(protected store: BoardStore) {
    super(store);
  }

  getBoardById$(boardId$: Observable<ID>): Observable<Board> {
    return getEntityByObservableId$(this.selectAll(), boardId$);
  }

  selectBoardsInGame(gameId: ID): Observable<Board[]> {
    return this.selectAll({ filterBy: board => board.gameId === gameId });
  }

  selectBoardDimensionIterate(boardId: ID, dimension: number): Observable<number[]> {
    return this.selectEntity(boardId).pipe(
      map(board =>
        numberToCountArray(
          board.range.max.dimensions[dimension],
          board.range.min.dimensions[dimension]
        )
      ),
      tag(`board-dimension-${dimension}`)
    );
  }

  selectBoardDimensionCount(boardId: ID, dimension: number): Observable<number> {
    return this.selectBoardDimensionIterate(boardId, dimension).pipe(
      map(list => list.length),
      tag(`board-dimensionCount-${dimension}`)
    );
  }
}
export function numberToCountArray(endNumber: number, startingNumber = 0): number[] {
  // ex. (8 => [0,1,2,3,4,5,6,7])
  // ex. ((8,1) => [1,2,3,4,5,6,7,8])
  // return Array(totalCount).fill(0).map((x, i) => i + startingNumber);
  const list = [];
  for (let number = startingNumber; number <= endNumber; number++) {
    list.push(number);
  }
  return list;
}
