import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Piece } from './piece.model';

export interface PieceState extends EntityState<Piece> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'piece' })
export class PieceStore extends EntityStore<PieceState, Piece> {

  constructor() {
    super();
  }

}

