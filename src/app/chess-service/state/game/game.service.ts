import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { GameStore } from './game.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(private gameStore: GameStore,
              private http: HttpClient) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.gameStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.gameStore.add(entity);
    // });
  }

}
