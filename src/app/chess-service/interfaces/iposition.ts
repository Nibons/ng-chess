import { IGame } from './igame';
import { IPiece } from '@chess/ipiece';
import { Guid } from '@chess/guid';
import { Coordinates } from '@chess/coordinates';
import { IBoard } from '@chess/iboard.model';
import { IGameItem } from '@chess/igame-item.model';
export interface IPosition extends IGameItem {
  game: IGame;
  boardId: Guid;
  board: IBoard;
  coordinates: Coordinates;
  IsOnBoard: boolean;
  IsOccupied: boolean;
  IsEmpty: boolean;
  piece: IPiece;
  SetPiece(piece?: IPiece): void;
  GetPosition(coordinates: Coordinates, boardId: Guid): IPosition;
}
