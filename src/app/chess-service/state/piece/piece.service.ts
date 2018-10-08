import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PieceStore } from './piece.store';
import { Piece } from 'src/app/chess-service/state/piece/piece.model';

@Injectable({ providedIn: 'root' })
export class PieceService {

  constructor(private pieceStore: PieceStore) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
    // this.pieceStore.set(entities);
    // });
  }

  add(piece: Piece): void {
    this.pieceStore.add(piece);
  }
  update(id: ID, piece: Partial<Piece>): void {
    this.pieceStore.update(id, piece);
  }

}
