import { Rook } from '@chess/rook';
import { Bishop } from '@chess/bishop';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePiece } from '@chess/pieces/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Store } from '@ngxs/store';

export class Queen extends BasePiece implements IPieceActor {
  GetThreatPositionIds(piece: Piece): number[] {
    return Queen.GetQueenThreat(piece);
  }
  readonly value = 9;
  readonly pieceType = EPieceType.queen;

  static GetQueenThreat(piece: Piece, count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
    Bishop.GetBishopThreatList(piece, count).forEach(guid_pos => position_cache.push(guid_pos));
    Rook.GetRookThreatList(piece, count).forEach(guid_pos => position_cache.push(guid_pos));
    return position_cache;
  }
  constructor(store: Store) {
    super(store);
  }
}
