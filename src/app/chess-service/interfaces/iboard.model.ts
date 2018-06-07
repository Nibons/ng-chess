import { BoardStateModel } from './iboard.model';
import { ICoordinates, IBoardDimensions } from '@chess/icoordinates.model';
import { IPosition } from '@chess/iposition.model';
import { IPiece } from '@chess/ipiece.model';
import { IGameItem, GameItemStateModel } from '@chess/igame-item.model';
export interface BoardStateModelList {
  boards: BoardStateModel[];
}
export interface BoardStateModel extends GameItemStateModel {
  currentTurnPlayerNumber: number;
  direction: Coordinates;
  range: IBoardDimensions;
  playerColors: string[];
  positionList: number[];
  activePieceList: number[];
}

export interface IBoard extends BoardStateModel, IGameItem {
  GetPositionAt(coordinates: ICoordinates): IPosition;
  AddPiece(piece: IPiece): void; // Piece has coordinates in it already!
  AddPosition(position: IPosition): void; // This adds the position to the board, based on coordinates
}
