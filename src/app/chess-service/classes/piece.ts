import { PieceState } from '@chess/piece-state';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { Store } from '@ngxs/store';
import { PieceStateModel } from '@chess/ipiece.model';
import { GameItem } from '@chess/game-item';
import { PieceActions } from '@chess/pieces/piece-actions';
export class Piece extends GameItem implements PieceStateModel {
  // region pulled from pieceState
  pieceType = this.pieceState.pieceType;
  Vital = this.pieceState.Vital;
  IsAlive = this.pieceState.IsAlive;
  HasMoved = this.pieceState.HasMoved;
  playerId = this.pieceState.playerId;
  playerNumber = this.pieceState.playerNumber;
  positionId = this.pieceState.positionId;
  readonly value;
  // endregion
  pieceActions: IPieceActions;
  threatList: number[] = this.pieceState.threatList;
  potentialMoves: number[] = this.pieceState.potentialMoves;

  constructor(public pieceState: PieceStateModel, store: Store) {
    super(pieceState.gameId, store);
    this.pieceActions = PieceActions.PieceActionFactory(pieceState.pieceType);
    this.value = this.pieceActions.value;
  }

}
