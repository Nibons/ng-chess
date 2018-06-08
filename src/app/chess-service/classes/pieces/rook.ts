import { PieceActions } from '@chess/pieces/piece-actions';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { PieceStateModel } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { IPieceActions } from '@chess/ipiece-actions.model';

export class Rook extends PieceActions implements IPieceActions {
  GetThreatPositionIds(piece: PieceStateModel): number[] {
    return Rook.GetRookThreatList(piece);
  }
  GetPotentialMovePositionIds(piece: PieceStateModel): number[] {
    throw new Error('Method not implemented.');
  }
  readonly value = 5;
  readonly pieceType = EPieceType.rook;
  static GetRookThreatList(piece: PieceStateModel, count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
    const directions = [1, -1];
    const dimensions_count = piece.position.coordinates.dimensions.length;
    piece.position.coordinates.dimensions.forEach(
      (value: number, d: number) => {
        const direction = Array(dimensions_count);
        for (const dim_direction of direction) {
          direction[d] = dim_direction;
          Piece.GetPositionsInDirectionUntilEmpty(
            piece,
            { dimensions: direction },
            count
          )
            .forEach(guid => position_cache.push(guid));
        }
      }
    );
    return position_cache;
  }
}
