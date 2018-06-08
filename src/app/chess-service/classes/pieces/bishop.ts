import { IPieceActions } from './../../interfaces/ipiece-actions.model';
import { PieceActions } from './piece-actions';
import { Piece } from '@chess/piece';
import { IPiece, PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';

export class Bishop extends PieceActions implements IPieceActions {

  readonly value = 3;
  readonly pieceType = EPieceType.bishop;
  GetThreatPositionIds(piece: PieceStateModel): number[] {
    return Bishop.GetBishopThreatList(piece);
  }
  static GetBishopThreatList(piece: PieceStateModel, count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
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
}
