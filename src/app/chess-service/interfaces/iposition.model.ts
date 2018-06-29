import { IPiece, PieceStateModel } from '@chess/ipiece.model';
import { Guid } from '@chess/guid';
import { IBoard } from '@chess/iboard.model';
import { IGameItem, GameItemStateModel } from '@chess/igame-item.model';
import { ICoordinates } from '@chess/icoordinates.model';
export interface PositionStateModelList {
  positions: PositionStateModel[];
}
export interface PositionStateModel extends GameItemStateModel {
  Id: Guid;
  boardId: Guid;
  pieceId: Guid;
  piece: PieceStateModel;
  coordinates: ICoordinates;
  watchList: Guid[];
}
export interface IPosition extends PositionStateModel, IGameItem {
  IsOnBoard: boolean;
  IsOccupied: boolean;
  IsEmpty: boolean;
  piece: IPiece;
  Board: IBoard;
  SetPiece(pieceId: number): void;
}
