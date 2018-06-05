import { IGame } from './igame.model';
import { IPiece } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { Coordinates } from '@chess/coordinates';
import { IBoard } from '@chess/iboard.model';
import { IGameItem } from '@chess/igame-item.model';
export interface IPosition extends IGameItem {
  game: IGame;
  boardId: Guid;
  coordinates: Coordinates;
  IsOnBoard: boolean;
  IsOccupied: boolean;
  IsEmpty: boolean;
  piece: IPiece;
  SetPiece(piece?: IPiece): void;
}
