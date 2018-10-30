import { Bishop, Rook, Pawn, Queen, Knight, King } from 'src/app/chess-service/classes/pieces';
import { Injectable } from '@angular/core';
import { Piece } from 'src/app/chess-service/state/piece';
import { merge, Observable } from 'rxjs';
import { IPieceType } from 'src/app/chess-service/interfaces/ipiece-type.model';

@Injectable({
  providedIn: 'root'
})
export class AllChessPiecesService {
  pieceTypes: IPieceType[];
  constructor(
    bishop: Bishop,
    // rook: Rook,
    // pawn: Pawn,
    // queen: Queen,
    // knight: Knight,
    // king: King
  ) {
    this.pieceTypes = [bishop,
      // rook,
      // pawn,
      // queen,
      // knight,
      // king
    ];
    this.startProcessingThreat();
  }

  startProcessingThreat() {
    this.pieceTypes.forEach(piece_type => piece_type.startProcessingThreat());
  }
}
