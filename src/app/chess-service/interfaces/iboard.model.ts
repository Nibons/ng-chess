import { BoardStateModel } from './iboard.model';
import { ICoordinates, IBoardDimensions } from '@chess/icoordinates.model';
import { IPosition, PositionStateModelList } from '@chess/iposition.model';
import { IPiece } from '@chess/ipiece.model';
import { IGameItem, GameItemStateModel } from '@chess/igame-item.model';
import { Guid } from '@chess/guid';
export interface BoardStateModelList {
  boards: BoardStateModel[];
}
export interface BoardStateModel extends GameItemStateModel {
  direction: Coordinates;
  range: IBoardDimensions;
  positions?: Guid[];
  activePieceList?: Guid[];
}

export interface IBoard extends BoardStateModel, IGameItem {
  GetPositionAt(coordinates: ICoordinates): IPosition;
  AddPiece(piece: IPiece): void; // Piece has coordinates in it already!
  AddPosition(position: IPosition): void; // This adds the position to the board, based on coordinates
}
