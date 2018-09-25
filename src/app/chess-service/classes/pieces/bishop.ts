import { Piece } from './../../state/piece/piece.model';
import { GameService } from 'src/app/chess-service/classes/GameService';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Bishop extends BasePiece {
  pieceType = EPieceType.bishop;

  static bishopThreat(piece: Piece, distance = Number.MAX_SAFE_INTEGER): void {

  }

  constructor(public gameService: GameService) {
    super(gameService);
  }

  processPiece(piece: Piece): void {
    Bishop.bishopThreat(piece);
  }
}
