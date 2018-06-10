import { ICoordinates } from './../interfaces/icoordinates.model';
import { Coordinates } from '@chess/coordinates';
import { map } from 'rxjs/operators';
import { PositionStateModel } from '@chess/iposition.model';
import { Observable } from 'rxjs';
import { PositionState } from '@chess/position-state';
import { PieceState } from '@chess/piece-state';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { Store } from '@ngxs/store';
import { PieceStateModel } from '@chess/ipiece.model';
import { GameItem } from '@chess/game-item';
import { PieceActions } from '@chess/pieces/piece-actions';
import { Select } from '@ngxs/store';
export class Piece extends GameItem implements PieceStateModel {
  @Select(PositionState.GetPositionByPieceId) positionModel$: Observable<(pieceId: number) => PositionStateModel>;
  protected coordinates: ICoordinates;
  // region pulled from pieceState
  pieceType = this.pieceState.pieceType;
  IsVital = this.pieceState.IsVital;
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
    this.pieceActions = PieceActions.PieceActionFactory(pieceState.pieceType, this.coordinates, store);
    this.value = this.pieceActions.value;
    this.setCoordinates();
  }
  private setCoordinates() {
    this.positionModel$.pipe(map((filterFn => filterFn(this.Id))))
      .subscribe(
        (position: PositionStateModel) => this.coordinates = position.coordinates
      );
  }

}
