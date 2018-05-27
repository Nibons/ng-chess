import { BasePiece } from '@chess/base-piece';
import { IPiece } from '@chess/ipiece';
import { Position } from '@chess/position';
import { Board } from '@chess/board';
import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { EPieceType } from '@chess/e-piece-type.enum';

export class Rook extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.rook;
  static ProcessRookThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    BasePiece.ProcessThreatInDirection(initialPosition, 1, 0, board).forEach(pos => position_cache.push(pos)); // East
    BasePiece.ProcessThreatInDirection(initialPosition, -1, 0, board).forEach(pos => position_cache.push(pos)); // West
    BasePiece.ProcessThreatInDirection(initialPosition, 0, 1, board).forEach(pos => position_cache.push(pos)); // North
    BasePiece.ProcessThreatInDirection(initialPosition, 0, -1, board).forEach(pos => position_cache.push(pos)); // South
    return position_cache;
  }
  GetThreatList() {
    return Rook.ProcessRookThreat(this.position, this.board);
  }

}
