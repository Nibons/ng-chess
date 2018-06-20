import { PieceStateModel } from './../../interfaces/ipiece.model';
import { Piece } from '@chess/piece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePiece } from '@chess/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Store, Actions } from '@ngxs/store';
import { Guid } from '@chess/guid';

export class Pawn extends BasePiece implements IPieceActor {
  GetThreatPositionIds(piece: PieceStateModel): Guid[] {
    return this.GetPawnThreat(piece);
  }
  GetPotentialMovePositionIds(): Guid[] {
    throw new Error('Method not implemented.');
  }
  readonly value = 1;
  readonly pieceType = EPieceType.pawn;
  public GetPawnThreat(piece: PieceStateModel): Guid[] {
    const position_cache = [];
    this.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [-1, 1] }, 1).forEach(pos => position_cache.push(pos));
    this.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [1, -1] }, 1).forEach(pos => position_cache.push(pos));
    return position_cache;
  }

  SetPotentialMoves(): void {

  }
  constructor(store: Store, actions$: Actions) {
    super(store, actions$);
  }
}
