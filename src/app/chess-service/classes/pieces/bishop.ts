import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';
import { BasePiece } from '@chess/pieces/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';

export class Bishop extends BasePiece implements IPieceActor {
  readonly value = 3;
  readonly pieceType = EPieceType.bishop;

  GetThreatPositionIds(piece: PieceStateModel): Guid[] {
    return Bishop.GetBishopThreatList(piece, this);
  }
  public static GetBishopThreatList(piece: PieceStateModel, pieceActor: IPieceActor, count = Number.MAX_SAFE_INTEGER): Guid[] {
    const position_cache = [];
    const directions = [1, -1];
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        pieceActor.GetPositionsInDirectionUntilEmpty(
          piece,
          { dimensions: [XDirection, YDirection] },
          count
        )
          .forEach(guid => position_cache.push(guid));
      }
    }
    return position_cache;
  }
  constructor(store: Store) {
    super(store);
  }
}
