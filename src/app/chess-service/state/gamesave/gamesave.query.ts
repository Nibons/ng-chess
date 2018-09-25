import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GamesaveStore, GamesaveState } from './gamesave.store';
import { Gamesave } from './gamesave.model';

@Injectable({ providedIn: 'root' })
export class GamesaveQuery extends QueryEntity<GamesaveState, Gamesave> {

  constructor(protected store: GamesaveStore) {
    super(store);
  }

}
