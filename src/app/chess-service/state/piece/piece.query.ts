import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { PieceStore, PieceState } from './piece.store';
import { Piece } from './piece.model';
import { Observable } from 'rxjs';
import { getEntityByObservableId$ } from 'src/app/chess-service/state/shared/shared.query';

@Injectable({ providedIn: 'root' })
export class PieceQuery extends QueryEntity<PieceState, Piece> {

  constructor(protected store: PieceStore) {
    super(store);
  }

  getPieceById$(pieceId$: Observable<ID>): Observable<Piece> {
    return getEntityByObservableId$(this.selectAll(), pieceId$);
  }
}
