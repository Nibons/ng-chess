import { BasePiece } from '@chess/base-piece';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/iposition';
import { Board } from '@chess/board';
import { EPieceType } from '@chess/e-piece-type.enum';

export class King extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.king;

  static ProcessKingThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) { break; } // not current position
        BasePiece.ProcessThreatInDirection(initialPosition, x, y, board, 1).forEach(pos => position_cache.push(pos));
      }
    }
    return position_cache;
  }
  GetThreatPositionList(initialPosition: IPosition = this.position, board: Board = this.board): IPosition[] {
    return King.ProcessKingThreat(initialPosition, board);
  }
}
