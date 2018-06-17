import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePiece } from '@chess/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Store } from '@ngxs/store';

export class Pawn extends BasePiece implements IPieceActor {
  GetThreatPositionIds(piece: Piece): number[] {
    return Pawn.GetPawnThreat(piece);
  }
  GetPotentialMovePositionIds(): number[] {
    throw new Error('Method not implemented.');
  }
  readonly value = 1;
  readonly pieceType = EPieceType.pawn;
  static GetPawnThreat(piece: Piece): number[] {
    const position_cache = [];
    PieceActions.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [-1, 1] }, 1).forEach(pos => position_cache.push(pos));
    PieceActions.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [1, -1] }, 1).forEach(pos => position_cache.push(pos));
    return position_cache;
  }

  SetPotentialMoves(): void {

  }
  constructor(store: Store) {
    super(store);
  }
}
