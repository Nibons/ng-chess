import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PieceStore } from './piece.store';
import { Piece, createPiece } from 'src/app/chess-service/state/piece/piece.model';
import { GameQuery } from 'src/app/chess-service/state/game/game.query';
import { map, tap, last, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, concat, of } from 'rxjs';
import { PieceQuery } from 'src/app/chess-service/state/piece/piece.query';

@Injectable({ providedIn: 'root' })
export class PieceService {

  constructor(
    private pieceStore: PieceStore,
    private gameQuery: GameQuery,
    private pieceQuery: PieceQuery) {
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

  private populatePiece(gameId: ID): Observable<Piece> {
    return this.gameQuery.selectPieceListFromTemplate(gameId).pipe(
      tap(() => this.pieceStore.setLoading(true)),
      map(pieceData => createPiece(pieceData, gameId)),
      tap(piece => this.add(piece))
    );
  }

  populateAllPieces(gameId: ID): Observable<Piece[]> {
    return this.populatePiece(gameId).pipe(
      last(),
      mergeMap(piece =>
        this.pieceQuery.selectPieceListByGameId(piece.gameId)
      )
    );
  }

}
