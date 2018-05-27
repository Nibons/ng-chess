import { Board } from '@chess/board';
import { IPiece } from '@chess/ipiece';
import { ChessObject } from '@chess/chess-object';
export interface IPosition {
  x: number;
  y: number;
  IsOnBoard?: boolean;
  IsEmpty?: boolean;
  board?: Board;
  piece?: IPiece;
}
