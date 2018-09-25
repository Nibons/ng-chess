import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PieceStore } from './piece.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PieceService {

  constructor(private pieceStore: PieceStore) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
    // this.pieceStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
    // this.pieceStore.add(entity);
    // });
  }

}
