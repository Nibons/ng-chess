import { EPieceType } from '@chess/e-piece-type.enum';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';
import { Piece } from '@chess/piece';
import { BasePiece } from '@chess/pieces/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';

export class Bishop extends BasePiece implements IPieceActor {
  readonly value = 3;
  readonly pieceType = EPieceType.bishop;

  GetThreatPositionIds(piece: Piece): number[] {
    return Bishop.GetBishopThreatList(piece);
  }
  static GetBishopThreatList(piece: Piece, count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
    const directions = [1, -1];
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        PieceActions.GetPositionsInDirectionUntilEmpty(
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
