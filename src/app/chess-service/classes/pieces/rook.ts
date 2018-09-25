import { Piece } from './../../state/piece/piece.model';
import { EPieceType } from './../../enums/e-piece-type.enum';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { GameService } from 'src/app/chess-service/classes/GameService';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class Rook extends BasePiece {
  pieceType = EPieceType.rook;

  static rookThreat(piece: Piece, distance = Number.MAX_SAFE_INTEGER) {

  }

  constructor(public gameService: GameService) {
    super(gameService);
  }

  processPiece(piece: Piece): void {
    Rook.rookThreat(piece);
  }
}
