import { Bishop } from '@chess/bishop';
import { Rook } from '@chess/rook';
import { Pawn } from '@chess/pawn';
import { BasePiece } from '@chess/base-piece';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/iposition';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Knight } from '@chess/pieces/knight';
import { Queen } from '@chess/pieces/queen';

export class King extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.king;
  readonly value = 100; // should be waaaay lower on normal games

  static ProcessKingThreat(initialPosition: IPosition): IPosition[] {
    const position_cache: IPosition[] = new Array();
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) { break; } // not current position
        this.ProcessThreatInDirection(initialPosition, x, y, initialPosition.board, 1).forEach(pos => position_cache.push(pos));
      }
    }
    return position_cache;
  }
  GetThreatList(initialPosition: IPosition = this.position): IPosition[] {
    return King.ProcessKingThreat(initialPosition);
  }
}
