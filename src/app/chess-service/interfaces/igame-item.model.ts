import { Guid } from '@chess/guid';
import { IGame } from '@chess/igame';

export interface IGameItem {
  gameId: Guid;
  game: IGame;
  GetFromId(id: Guid): IGameItem;
}
