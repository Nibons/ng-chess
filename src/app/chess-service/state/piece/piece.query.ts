import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PieceStore, PieceState } from './piece.store';
import { Piece } from './piece.model';

@Injectable({ providedIn: 'root' })
export class PieceQuery extends QueryEntity<PieceState, Piece> {

  constructor(protected store: PieceStore) {
    super(store);
  }

}
