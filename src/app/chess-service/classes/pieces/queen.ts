import { PieceStateModel } from '@chess/ipiece.model';
import { Rook } from '@chess/rook';
import { Bishop } from '@chess/bishop';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePiece } from '@chess/pieces/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Store } from '@ngxs/store';
import { Guid } from '@chess/guid';

export class Queen extends BasePiece implements IPieceActor {
  GetThreatPositionIds(piece: PieceStateModel): Guid[] {
    return Queen.GetQueenThreat(piece, this);
  }
  readonly value = 9;
  readonly pieceType = EPieceType.queen;

  public static GetQueenThreat(piece: PieceStateModel, pieceActor: IPieceActor, count = Number.MAX_SAFE_INTEGER): Guid[] {
    return [...Bishop.GetBishopThreatList(piece, pieceActor, count),
    ...Rook.GetRookThreatList(piece, pieceActor, count)];
  }
  constructor(store: Store) {
    super(store);
  }
}
