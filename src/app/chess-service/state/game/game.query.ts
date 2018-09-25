import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GameStore, GameState } from './game.store';
import { Game } from './game.model';

@Injectable({ providedIn: 'root' })
export class GameQuery extends QueryEntity<GameState, Game> {

  constructor(protected store: GameStore) {
    super(store);
  }

}
