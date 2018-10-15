import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { BoardStore, BoardState } from './board.store';
import { Board } from './board.model';
import { Observable } from 'rxjs';
import { getEntityByObservableId$ } from 'src/app/chess-service/state/shared/shared.query';

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
}
