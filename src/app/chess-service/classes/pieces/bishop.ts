import { IPieceActions } from './../../interfaces/ipiece-actions.model';
import { PieceActions } from './piece-actions';
import { EPieceType } from '@chess/e-piece-type.enum';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';
import { Piece } from '@chess/piece';

export class Bishop extends PieceActions implements IPieceActions {
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
  constructor(coordinates: ICoordinates, store: Store) {
    super(coordinates, store);
  }
}
