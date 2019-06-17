import { ICoordinate } from 'src/app/interfaces/icoordinate';
import { IPosition } from 'src/app/interfaces/iposition';

export interface IBoard {
  boardNumber: number;
  positions: IPosition[];
}
