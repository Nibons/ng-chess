import { PieceState } from '@chess/piece-state';
import { PieceStateModel } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
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
    return this.GetThreatPositionIds(piece);
  }


  static GetKingThreat(piece: PieceStateModel, pieceActor: IPieceActor): Guid[] {
    return Queen.GetQueenThreat(piece, pieceActor, 1);
  }
  castling(piece: PieceStateModel): Guid[] {
    if (piece.HasMoved) {
      const rooks = this.store.selectSnapshot(PieceState.PieceList).filter(
        piece => piece.pieceType === EPieceType.rook &&
          piece.gameId.IsEqual(piece.gameId) &&
          piece.playerId.IsEqual(piece.playerId) &&
          piece.HasMoved
      );
      if (rooks !== undefined) {
        throw new Error('Method not implemented');
      }
    } else { return []; }
  }
}
