import { Piece } from './../../state/piece/piece.model';
import { EPieceType } from './../../enums/e-piece-type.enum';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { Injectable } from '@angular/core';
import { VectorLibrary } from 'src/app/chess-service/classes/vector';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { PositionQuery } from '../../state/position';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';


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
