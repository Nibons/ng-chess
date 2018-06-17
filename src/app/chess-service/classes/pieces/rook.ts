import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';
import { BasePiece } from '@chess/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';

export class Rook extends BasePiece implements IPieceActor {
  GetThreatPositionIds(piece: Piece): number[] {
    return Rook.GetRookThreatList(piece);
  }
  readonly value = 5;
  readonly pieceType = EPieceType.rook;
  static GetRookThreatList(piece: Piece, count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
    const directions = [1, -1];
    const dimensions_count = piece.coordinates.dimensions.length;
    piece.coordinates.dimensions.forEach(
      (value: number, d: number) => {
        const direction = Array(dimensions_count);
        for (const dim_direction of direction) {
          direction[d] = dim_direction;
          PieceActions.GetPositionsInDirectionUntilEmpty(
            piece,
            { dimensions: direction },
            count
          )
            .forEach(positionId => position_cache.push(positionId));
        }
      }
    );
    return position_cache;
  }
  constructor(store: Store) {
    super(store);
  }
}
