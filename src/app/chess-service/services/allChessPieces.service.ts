import { Bishop, Rook } from 'src/app/chess-service/classes/pieces';
import { Injectable } from '@angular/core';
import { Piece } from 'src/app/chess-service/state/piece';
import { merge, Observable } from 'rxjs';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';

@Injectable({
  providedIn: 'root'
})
export class AllChessPiecesService {
  pieceTypes: IPieceType[];
  constructor(bishop: Bishop, rook: Rook) {
    this.pieceTypes = [bishop, rook];
  }

  SelectPiecesWithThreatList(pieces$: Observable<Piece>): Observable<Piece> {
    let mergedPieces = Observable.create();
    this.pieceTypes.forEach(
      pieceType => {
        mergedPieces = mergedPieces.pipe(
          merge(pieceType.selectPieceWithThreatList(pieces$))
        );
      }
    );
    return mergedPieces;
  }
}
