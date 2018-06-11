import { IGame } from './options.model';
import { GameItemStateModel } from './igame-item.model';
import { Guid } from '@chess/guid';

export interface GameItemStateModel {
  Id: number;
  gameId: Guid;
}
export interface IGameItem extends GameItemStateModel {
  game: IGame;
}
