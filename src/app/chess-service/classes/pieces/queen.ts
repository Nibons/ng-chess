import { IPieceActions } from '@chess/ipiece-actions.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { PieceActions } from '@chess/pieces/piece-actions';
import { Rook } from '@chess/rook';
import { Bishop } from '@chess/bishop';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';

export class Queen extends PieceActions implements IPieceActions {
  GetThreatPositionIds(piece: PieceActions): number[] {
    return Queen.GetQueenThreat(piece);
  }
  GetPotentialMovePositionIds(piece: PieceActions): number[] {
    throw new Error('Method not implemented.');
  }
  readonly value = 9;
  readonly pieceType = EPieceType.queen;

  static GetQueenThreat(piece: PieceActions, count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
    Bishop.GetBishopThreatList(piece, count).forEach(guid_pos => position_cache.push(guid_pos));
    Rook.GetRookThreatList(piece, count).forEach(guid_pos => position_cache.push(guid_pos));
    return position_cache;
  }
  constructor(coordinates: ICoordinates, store: Store) {
    super(coordinates, store);
  }
}
