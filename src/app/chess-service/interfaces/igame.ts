import { IBoard } from './iboard.model';
import { IPlayer } from '@chess/iplayer.model';
import { IPiece } from '@chess/ipiece';
import { Guid } from '@chess/guid';
import { IPosition } from '@chess/iposition';
export interface IGame {
  playerList: IPlayer[];
  board: IBoard;
  pieces: IPiece[];
  GetPlayerById(playerId: Guid): IPlayer;
  GetBoardById(boardId: Guid): IBoard;
  GetPositionById(positionId: Guid): IPosition;
}
