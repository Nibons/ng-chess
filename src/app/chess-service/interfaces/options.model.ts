import { GameItemStateModel } from '@chess/igame-item.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel, IBoard } from '@chess/iboard.model';
import { PositionStateModel, IPosition } from '@chess/iposition.model';
import { PlayerStateModel, IPlayer } from '@chess/iplayer.model';
import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';

export interface PartialOptionsStateModel {
  colorList: string[];
  currentTurnPlayerNumber: number;
  friendlyFire: boolean;
}
export interface OptionsStateModelList {
  optionSets: OptionsStateModel[];
}
export interface OptionsStateModel extends PartialOptionsStateModel {
  Id: Guid;
  IdCounter: number;
}
export interface IGame extends OptionsStateModel {
  GetPlayerById(playerId: number): PlayerStateModel;
  GetBoardById(boardId: number): BoardStateModel;
  GetPositionById(positionId: number): PositionStateModel;
  GetPieceById(pieceId: number): PieceStateModel;
  GetPositionByCoordinates(coordinates: ICoordinates): PositionStateModel;
  GetPositionByPieceId(pieceId: number): PositionStateModel;
}
