import { EPieceType } from './../../enums/e-piece-type.enum';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { GameService } from 'src/app/chess-service/classes/GameService';
import { Injectable } from '@angular/core';
import { IPiece } from 'src/app/chess-service/interfaces/ipiece.model';

@Injectable({ providedIn: 'root' })
export class Rook extends BasePiece {
  pieceType = EPieceType.rook;

  static rookThreat(piece: IPiece, distance = Number.MAX_SAFE_INTEGER) {

  }

  constructor(public gameService: GameService) {
    super(gameService);
  }

  processPiece(piece: IPiece): void {
    Rook.rookThreat(piece);
  }
}
