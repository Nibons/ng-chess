import { Injectable } from '@angular/core';
import { PieceQuery, PieceService, Piece, } from 'src/app/chess-service/state/piece';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { Observable, Subject, Subscription } from 'rxjs';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PieceStreamService {

  private pieceUpdateSubscription: Subscription;
  private pieceStream$: Observable<Piece>;

  private pieceUpdate$: Subject<Piece> = new Subject<Piece>();

  constructor(
    public pieceQuery: PieceQuery,
    public positionQuery: PositionQuery,
    private pieceService: PieceService
  ) {
    this.pieceStream$ = pieceQuery.getAllPieces$();
    this.pieceUpdateSubscription = this.pieceUpdate$.subscribe(
      piece => this.updatePiece(piece),
      err => console.log(err),
      () => this.destructor()
    );
  }
  piecesFilteredByType$(pieceType: EPieceType): Observable<Piece> {
    return this.pieceStream$.pipe(
      filter(piece => piece.pieceType === pieceType)
    );
  }

  update(piece: Piece): void {
    this.pieceUpdate$.next(piece);
  }

  private destructor() {
    this.pieceUpdateSubscription.unsubscribe();
  }

  private updatePiece(piece: Piece): void {
    this.pieceService.update(piece.id, piece);
  }
}
