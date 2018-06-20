import { GameItemStateModel } from '@chess/igame-item.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel, IBoard } from '@chess/iboard.model';
import { PositionStateModel, IPosition } from '@chess/iposition.model';
import { PlayerStateModel, IPlayer } from '@chess/iplayer.model';
import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';

export interface PartialOptionsStateModel {
  colorList: string[];
  currentTurnPlayerNumber: Guid;
  friendlyFire: boolean;
}
export interface OptionsStateModelList {
  optionSets: OptionsStateModel[];
}
export interface OptionsStateModel extends PartialOptionsStateModel {
  Id: Guid;
}
export interface IGame extends OptionsStateModel {
  GetPlayerById(playerId: Guid): PlayerStateModel;
  GetBoardById(boardId: Guid): BoardStateModel;
  GetPositionById(positionId: Guid): PositionStateModel;
  GetPieceById(pieceId: Guid): Partial<PieceStateModel>;
  GetPositionByCoordinates(coordinates: ICoordinates): PositionStateModel;
  GetPositionByPieceId(pieceId: Guid): PositionStateModel;
}
