import { GameItemStateModel } from './igame-item.model';
import { Guid } from '@chess/guid';
import { IGame } from '@chess/igame.model';
export interface GameItemStateModel {
  Id: Guid;
  gameId: Guid;
}
export interface IGameItem extends GameItemStateModel {
  game: IGame;
}
