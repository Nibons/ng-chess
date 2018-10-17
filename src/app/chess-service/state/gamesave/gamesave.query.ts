import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GamesaveStore, GamesaveState } from './gamesave.store';
import { Gamesave } from './gamesave.model';
import { Observable, from, of } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GamesaveQuery extends QueryEntity<GamesaveState, Gamesave> {

  constructor(protected store: GamesaveStore) {
    super(store);
  }

  getById(id: string | null): Observable<Gamesave> {
    return this.selectAll().pipe(
      mergeMap(gameSaveList => from(gameSaveList)),
      filter(gameSave => gameSave.id === id)
    );
  }

}
