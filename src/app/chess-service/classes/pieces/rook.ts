import { PieceActions } from '@chess/pieces/piece-actions';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { PieceStateModel } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';

export class Rook extends PieceActions implements IPieceActions {
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
  constructor(coordinates: ICoordinates, store: Store) {
    super(coordinates, store);
  }
}
