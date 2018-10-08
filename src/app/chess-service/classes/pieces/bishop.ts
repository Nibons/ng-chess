import { Piece } from './../../state/piece/piece.model';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';
import { BasePiece } from 'src/app/chess-service/classes/BasePiece';
import { Injectable } from '@angular/core';
import { VectorLibrary } from 'src/app/chess-service/classes/vector';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { PositionQuery } from 'src/app/chess-service/state/position';
import { merge } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Bishop extends BasePiece {
  pieceType = EPieceType.bishop;

  static bishopThreat(piece: Piece, distance = Number.MAX_SAFE_INTEGER): IVector[] {
    return VectorLibrary.GetDiagonalDirectionVectorList(piece.coordinates, distance);
  }

  constructor(public gameService: GameService) {
    super(gameService);
  }

  processPiece(piece: Piece): void {
    Bishop.bishopThreat(piece);
  }
}
