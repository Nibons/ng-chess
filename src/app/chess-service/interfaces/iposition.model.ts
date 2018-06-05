import { GameStateModel } from '@chess/igame.model';
import { IGame } from './igame.model';
import { IPiece } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { Coordinates } from '@chess/coordinates';
import { IBoard } from '@chess/iboard.model';
import { IGameItem, GameItemStateModel } from '@chess/igame-item.model';
import { ICoordinates } from '@chess/icoordinates.model';
export interface PositionStateModel extends GameItemStateModel {
  boardId: Guid;
  pieceId: Guid;
  gameId: Guid;
  coordinates: ICoordinates;
}
export interface IPosition extends PositionStateModel, IGameItem {
  game: IGame;
  IsOnBoard: boolean;
  IsOccupied: boolean;
  IsEmpty: boolean;
  piece: IPiece;
  Board: IBoard;
  SetPiece(piece?: IPiece): void;
}
