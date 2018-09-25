import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { GamesaveStore } from './gamesave.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GamesaveService {

  constructor(private gamesaveStore: GamesaveStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.gamesaveStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.gamesaveStore.add(entity);
    // });
  }

}
