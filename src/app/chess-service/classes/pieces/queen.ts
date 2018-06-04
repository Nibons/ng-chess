import { Rook } from '@chess/rook';
import { Bishop } from '@chess/bishop';
import { BasePiece } from '@chess/base-piece';
import { IPosition } from '@chess/iposition';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece';

export class Queen extends BasePiece implements IPiece {
  readonly value = 9;
  readonly pieceType = EPieceType.queen;
  static ProcessQueenThreat(initialPosition: IPosition): IPosition[] {
    const position_cache: IPosition[] = new Array();
    Bishop.ProcessBishopThreat(initialPosition).forEach(pos => position_cache.push(pos));
    Rook.ProcessRookThreat(initialPosition).forEach(pos => position_cache.push(pos));
    return position_cache;
  }
  ProcessThreat(): void {
    Queen.ProcessQueenThreat(this.position);
  }

  GetThreatList(): IPosition[] { return Queen.ProcessQueenThreat(this.position); }
}
