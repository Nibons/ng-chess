import { IPieceActor } from '@chess/IPieceActor.model';
import { BasePiece } from '@chess/pieces/BasePiece';
import { Queen } from '@chess/queen';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';

export class King extends BasePiece implements IPieceActor {
  readonly pieceType = EPieceType.king;
  readonly value = 100; // should be waaaay lower on normal games
  constructor(store: Store) {
    super(store);
  }
  GetThreatPositionIds(piece: Piece): number[] {
    return King.GetKingThreat(piece);
  }
  GetPotentialMovePositionIds(piece: Piece): number[] {
    throw new Error('Method not implemented.');
  }


  static GetKingThreat(piece: Piece): number[] {
    return Queen.GetQueenThreat(piece, 1);
  }
}
