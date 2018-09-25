import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Board } from './board.model';

export interface BoardState extends EntityState<Board> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'board' })
export class BoardStore extends EntityStore<BoardState, Board> {

  constructor() {
    super();
  }

}

