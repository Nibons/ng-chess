import { PieceActions } from '@chess/pieces/piece-actions';
import { Queen } from '@chess/queen';
import { Piece } from '@chess/piece';
import { IPiece, PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { IPieceActions } from '@chess/ipiece-actions.model';

export class King extends PieceActions implements IPieceActions {
  GetThreatPositionIds(piece: PieceStateModel): number[] {
    return King.GetKingThreat(piece);
  }
  GetPotentialMovePositionIds(piece: PieceStateModel): number[] {
    throw new Error('Method not implemented.');
  }
  readonly pieceType = EPieceType.king;
  readonly value = 100; // should be waaaay lower on normal games

  static GetKingThreat(piece: PieceStateModel): number[] {
    return Queen.GetQueenThreat(piece, 1);
  }
}
