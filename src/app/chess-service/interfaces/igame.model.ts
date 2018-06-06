import { GameItemStateModel } from '@chess/igame-item.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel, IBoard } from '@chess/iboard.model';
import { PositionStateModel, IPosition } from '@chess/iposition.model';
import { PlayerStateModel, IPlayer } from '@chess/iplayer.model';
import { Guid } from '@chess/guid';
export interface GameServiceDataModel {
  game: GameItemStateModel[];
}

export interface GameStateModel {
  Id: Guid;
  playerList?: PlayerStateModel[];
  board?: BoardStateModel[];
  positions?: PositionStateModel[];
  pieces?: PieceStateModel[];
}
export interface IGame extends GameStateModel {
  GetPlayerById(playerId: Guid): IPlayer;
  GetBoardById(boardId: Guid): IBoard;
  GetPositionById(positionId: Guid): IPosition;
}
