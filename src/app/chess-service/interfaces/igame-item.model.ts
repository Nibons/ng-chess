import { Guid } from '@chess/guid';
import { IGame } from '@chess/igame.model';

export interface IGameItem {
  Id: Guid;
  gameId: Guid;
}
