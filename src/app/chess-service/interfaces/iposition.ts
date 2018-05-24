import { Board } from '@chess/board';
export interface IPosition {
  x: number;
  y: number;
  IsOnBoard?: boolean;
  IsEmpty?: boolean;
  board?: Board;
}
