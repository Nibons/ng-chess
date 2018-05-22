import {Board} from '../classes/board';
export interface IPosition {
  x: number;
  y: number;
  IsOnBoard?: boolean;
  IsEmpty?: boolean;
  board?: Board;
}
