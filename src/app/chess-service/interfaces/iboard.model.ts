import { ICoordinate } from '@chess/icoordinate.model';
import { IPosition } from '@chess/iposition.model';
export interface IBoard {
  id: number;
  min: Coordinates;
  max: Coordinates;
  GetPosition(ICoordinate): IPosition;
  static FindBoard(boardId: number): IBoard;
}
