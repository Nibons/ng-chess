import { IPiece } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { Coordinates } from '@chess/coordinates';
import { IBoard } from '@chess/iboard.model';
import { IGameItem, GameItemStateModel } from '@chess/igame-item.model';
import { ICoordinates } from '@chess/icoordinates.model';
export interface PositionStateModelList {
  positions: PositionStateModel[];
}
export interface PositionStateModel extends GameItemStateModel {
  boardId: number;
  pieceId: number;
  coordinates: ICoordinates;
}
export interface IPosition extends PositionStateModel, IGameItem {
  IsOnBoard: boolean;
  IsOccupied: boolean;
  IsEmpty: boolean;
  piece: IPiece;
  Board: IBoard;
  SetPiece(pieceId: number): void;
}
