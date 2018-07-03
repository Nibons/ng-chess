import { PlayerState } from '@chess/player-state';
import { PieceStateModel } from './../../interfaces/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePiece } from '@chess/BasePiece';
import { IPieceActor } from '@chess/IPieceActor.model';
import { Store } from '@ngxs/store';
import { Guid } from '@chess/guid';

export class Pawn extends BasePiece implements IPieceActor {
  GetThreatPositionIds(piece: PieceStateModel): Guid[] {
    return this.GetPawnThreat(piece);
  }
  GetPotentialMovePositionIds(piece: PieceStateModel): Guid[] {
    const pieceDirection = this.store.selectSnapshot(PlayerState.PlayerList)[piece.playerNumber].pieceOrientation;
    const pawnMoveCount = piece.HasMoved ? 1 : 2;
    return [...this.GetPositionsInDirectionUntilEmpty(piece, pieceDirection, pawnMoveCount)];
  }
  readonly value = 1;
  readonly pieceType = EPieceType.pawn;
  public GetPawnThreat(piece: PieceStateModel): Guid[] {
    const pieceDirection = this.store.selectSnapshot(PlayerState.PlayerList)[piece.playerNumber].pieceOrientation;
    const pieceDirectionYVal = pieceDirection.dimensions[1];
    return [
      ...this.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [-1, pieceDirectionYVal] }, 1),
      ...this.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [1, pieceDirectionYVal] }, 1)
    ];
  }

  SetPotentialMoves(): void {

  }
  constructor(store: Store) {
    super(store);
  }
}
