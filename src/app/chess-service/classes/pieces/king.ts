import { Guid } from '@chess/guid';
import { PieceStateModel } from './../../interfaces/ipiece.model';
import { IPieceActor } from '@chess/IPieceActor.model';
import { BasePiece } from '@chess/pieces/BasePiece';
import { Queen } from '@chess/queen';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';

export class King extends BasePiece implements IPieceActor {
  readonly pieceType = EPieceType.king;
  readonly value = 100; // should be waaaay lower on normal games
  constructor(store: Store) {
    super(store);
  }
  GetThreatPositionIds(piece: PieceStateModel): Guid[] {
    return King.GetKingThreat(piece, this);
  }
  GetPotentialMovePositionIds(piece: PieceStateModel): Guid[] {
    throw new Error('Method not implemented.');
  }


  static GetKingThreat(piece: PieceStateModel, pieceActor: IPieceActor): Guid[] {
    return Queen.GetQueenThreat(piece, pieceActor, 1);
  }
}
