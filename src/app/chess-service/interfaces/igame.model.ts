import { IBoard } from './iboard.model';
import { IPlayer } from '@chess/iplayer.model';
import { IPiece } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { IPosition } from '@chess/iposition.model';
export interface GameStateModel {
  Id: Guid;
  playerList: IPlayer[];
  board: IBoard;
  pieces: IPiece[];
}
export interface IGame extends GameStateModel {
  GetPlayerById(playerId: Guid): IPlayer;
  GetBoardById(boardId: Guid): IBoard;
  GetPositionById(positionId: Guid): IPosition;
}
