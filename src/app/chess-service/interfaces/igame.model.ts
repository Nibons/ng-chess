import { GameItemStateModel } from '@chess/igame-item.model';
import { PieceStateModel } from '@chess/ipiece.model';
import { BoardStateModel, IBoard } from '@chess/iboard.model';
import { PositionStateModel, IPosition } from '@chess/iposition.model';
import { PlayerStateModel, IPlayer } from '@chess/iplayer.model';
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
