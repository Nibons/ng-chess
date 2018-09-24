import { IPiece } from 'src/app/chess-service/interfaces/ipiece.model';
import { GameService } from 'src/app/chess-service/classes/GameService';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Bishop extends BasePiece {
  pieceType = EPieceType.bishop;

  static bishopThreat(piece: IPiece, distance = Number.MAX_SAFE_INTEGER): void {

  }

  constructor(public gameService: GameService) {
    super(gameService);
  }

  processPiece(piece: IPiece): void {
    Bishop.bishopThreat(piece);
  }
}
