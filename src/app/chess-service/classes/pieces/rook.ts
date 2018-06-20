import { PieceStateModel } from './../../interfaces/ipiece.model';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';
import { BasePiece } from '@chess/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Guid } from '@chess/guid';

export class Rook extends BasePiece implements IPieceActor {
  GetThreatPositionIds(piece: PieceStateModel): Guid[] {
    return Rook.GetRookThreatList(piece, this);
  }
  readonly value = 5;
  readonly pieceType = EPieceType.rook;
  public static GetRookThreatList(piece: PieceStateModel, pieceActor: IPieceActor, count = Number.MAX_SAFE_INTEGER): Guid[] {
    const position_cache = [];
    const directions = [1, -1];
    const dimensions_count = piece.coordinates.dimensions.length;
    piece.coordinates.dimensions.forEach(
      (value: number, d: number) => {
        const direction = Array(dimensions_count);
        for (const dim_direction of directions) {
          direction[d] = dim_direction;
          pieceActor.GetPositionsInDirectionUntilEmpty(
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
