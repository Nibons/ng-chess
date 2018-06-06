import { Piece } from '@chess/piece';
import { Position } from '@chess/position';
import { Coordinates } from '@chess/coordinates';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';

export class Rook extends BasePiece implements IPiece {
  readonly value = 5;
  readonly pieceType = EPieceType.rook;
  static ProcessRookThreat(initialPosition: IPosition): IPosition[] {
    const position_cache: IPosition[] = new Array();
    BasePiece.ProcessThreatInDirection(initialPosition, 1, 0).forEach(pos => position_cache.push(pos)); // East
    BasePiece.ProcessThreatInDirection(initialPosition, -1, 0).forEach(pos => position_cache.push(pos)); // West
    BasePiece.ProcessThreatInDirection(initialPosition, 0, 1).forEach(pos => position_cache.push(pos)); // North
    BasePiece.ProcessThreatInDirection(initialPosition, 0, -1).forEach(pos => position_cache.push(pos)); // South
    return position_cache;
  }
  GetThreatList() {
    return Rook.ProcessRookThreat(this.position);
  }

}
