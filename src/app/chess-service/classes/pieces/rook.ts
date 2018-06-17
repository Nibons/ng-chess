import { PieceStateModel } from './../../interfaces/ipiece.model';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';
import { BasePiece } from '@chess/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';

export class Rook extends BasePiece implements IPieceActor {
  GetThreatPositionIds(piece: PieceStateModel): number[] {
    return this.GetRookThreatList(piece);
  }
  readonly value = 5;
  readonly pieceType = EPieceType.rook;
  public GetRookThreatList(piece: PieceStateModel, count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
    const directions = [1, -1];
    const dimensions_count = piece.coordinates.dimensions.length;
    piece.coordinates.dimensions.forEach(
      (value: number, d: number) => {
        const direction = Array(dimensions_count);
        for (const dim_direction of directions) {
          direction[d] = dim_direction;
          this.GetPositionsInDirectionUntilEmpty(
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
