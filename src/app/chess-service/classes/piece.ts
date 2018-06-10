import { GameItem } from '@chess/game-item';
import { IGame } from './../interfaces/igame.model';
import { ICoordinates } from './../interfaces/icoordinates.model';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { Store } from '@ngxs/store';
import { PieceStateModel } from '@chess/ipiece.model';
import { PieceActions } from '@chess/pieces/piece-actions';
import { Game } from '@chess/game';
export class Piece extends GameItem implements PieceStateModel {
  // region pulled from pieceState
  Id: number;
  pieceType = this.pieceState.pieceType;
  IsVital = this.pieceState.IsVital;
  IsAlive = this.pieceState.IsAlive;
  HasMoved = this.pieceState.HasMoved;
  playerId = this.pieceState.playerId;
  playerNumber = this.pieceState.playerNumber;
  positionId = this.pieceState.positionId;
  readonly value;
  coordinates: ICoordinates;
  // endregion
  protected game: IGame;
  pieceActions: IPieceActions;
  threatList: number[];
  potentialMoves: number[];

  constructor(public pieceState: PieceStateModel, store: Store) {
    super(pieceState.gameId, store);
    this.Id = pieceState.Id;
    this.game = new Game(pieceState.gameId, store);
    this.coordinates = this.game.GetPositionByPieceId(this.Id).coordinates;
    this.pieceActions = PieceActions.PieceActionFactory(pieceState.pieceType, this.coordinates, store);
    this.value = this.pieceActions.value;
  }
  public setThreat() {
    this.threatList = this.pieceActions.GetThreatPositionIds(this);
  }
}
