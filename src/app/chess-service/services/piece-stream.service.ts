import { Injectable } from '@angular/core';
import { PieceQuery, PieceService, Piece, } from 'src/app/chess-service/state/piece';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { Observable } from 'rxjs';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PieceStreamService {

  pieceStream$: Observable<Piece>;

  constructor(
    public pieceQuery: PieceQuery,
    public positionQuery: PositionQuery,
    private pieceService: PieceService
  ) {
    this.pieceStream$ = pieceQuery.getAllPieces$();
  }

  public piecesFilteredByType$(pieceType: EPieceType): Observable<Piece> {
    return this.pieceStream$.pipe(
      filter(piece => piece.pieceType === pieceType)
    );
  }
}
