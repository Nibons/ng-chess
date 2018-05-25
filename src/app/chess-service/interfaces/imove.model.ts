import { IPosition } from '@chess/iposition';
import { IPiece } from '@chess/ipiece';

export interface IMove {
  piece: IPiece;
  position: IPosition;
}
