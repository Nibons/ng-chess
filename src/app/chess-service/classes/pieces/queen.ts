import { Board } from '@chess//board';
import { Rook } from '@chess/rook';
import { Bishop } from '@chess/bishop';
import { BasePiece } from '@chess/base-piece';
import { Position } from '@chess/position';
import { IPosition } from '@chess/iposition';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece';

export class Queen extends BasePiece implements IPiece {
  readonly value = 9;
  readonly pieceType = EPieceType.queen;
  static ProcessQueenThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    Bishop.ProcessBishopThreat(initialPosition, board).forEach(pos => position_cache.push(pos));
    Rook.ProcessRookThreat(initialPosition, board).forEach(pos => position_cache.push(pos));
    return position_cache;
  }
  ProcessThreat(): void {
    Queen.ProcessQueenThreat(this.position, this.board);
  }

  GetThreatList(): IPosition[] { return Queen.ProcessQueenThreat(this.position, this.board); }
}
