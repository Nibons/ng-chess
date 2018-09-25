import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Gamesave } from './gamesave.model';

export interface GamesaveState extends EntityState<Gamesave> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'gamesave' })
export class GamesaveStore extends EntityStore<GamesaveState, Gamesave> {

  constructor() {
    super();
  }

}

