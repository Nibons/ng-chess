import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PieceStore } from './piece.store';
import { Piece, createPiece } from 'src/app/chess-service/state/piece/piece.model';
import { GameQuery } from 'src/app/chess-service/state/game/game.query';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PieceService {

  constructor(
    private pieceStore: PieceStore,
    private gameQuery: GameQuery) {
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


  populatePieces(gameId: ID) {
    const template$ = this.gameQuery.selectEntity(gameId).pipe(
      map(game => game.template.pieces)
    );
    const pieceDefaults$ = template$.pipe(map(template => template.pieceDefaults));
    const pieceList$: Observable<Piece> = template$.pipe(
      map(pieceTemplate => pieceTemplate.pieces),
      mergeMap(pieceList => from(pieceList)),
      withLatestFrom(pieceDefaults$),
      map(([piece, template]) => createPiece(piece, template, gameId))
    );

    const createPieceSubscription = pieceList$.subscribe(
      (piece => this.add(piece)),
      ((err) => console.log(err))
    );
    createPieceSubscription.unsubscribe();
  }
}
