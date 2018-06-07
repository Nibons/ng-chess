import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';

export class Rook extends Piece implements IPiece {
  readonly value = 5;
  readonly pieceType = EPieceType.rook;
  static RefreshRookThreatList(piece: IPiece, count = Number.MAX_SAFE_INTEGER): Guid[] {
    const position_cache: Guid[] = [];
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
  RefreshThreatList(): void { this.threatList = Rook.RefreshRookThreatList(this); }

}
