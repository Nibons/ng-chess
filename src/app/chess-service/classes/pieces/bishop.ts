import { Piece } from '@chess/piece';
import { IPiece } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Coordinates } from '@chess/coordinates';
import { Guid } from '@chess/guid';

export class Bishop extends Piece implements IPiece {
  readonly value = 3;
  readonly pieceType = EPieceType.bishop;
  static RefreshBishopThreatList(piece: IPiece, count = Number.MAX_SAFE_INTEGER): Guid[] {
    const position_cache: Guid[] = [];
    const directions = [1, -1];
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        Piece.GetPositionsInDirectionUntilEmpty(
          piece,
          { dimensions: [XDirection, YDirection] },
          count
        )
          .forEach(guid => position_cache.push(guid));
      }
    }
    return position_cache;
  }
  RefreshThreatList() { this.threatList = Bishop.RefreshBishopThreatList(this); }
}
