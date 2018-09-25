import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { BoardStore, BoardState } from './board.store';
import { Board } from './board.model';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BoardQuery extends QueryEntity<BoardState, Board> {
  incompleteBoards$ = this.selectAll({ filterBy: board => !!board.positionsPlaced });

  constructor(protected store: BoardStore, private positionQuery: PositionQuery) {
    super(store);
  }
}
