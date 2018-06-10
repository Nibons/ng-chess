import { PieceActions } from '@chess/pieces/piece-actions';
import { Queen } from '@chess/queen';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';

export class King extends PieceActions implements IPieceActions {
  readonly pieceType = EPieceType.king;
  readonly value = 100; // should be waaaay lower on normal games
  constructor(coordinates: ICoordinates, store: Store) {
    super(coordinates, store);
  }
  GetThreatPositionIds(piece: PieceStateModel): number[] {
    return King.GetKingThreat(piece);
  }
  GetPotentialMovePositionIds(piece: PieceStateModel): number[] {
    throw new Error('Method not implemented.');
  }


  static GetKingThreat(piece: PieceStateModel): number[] {
    return Queen.GetQueenThreat(piece, 1);
  }
}
