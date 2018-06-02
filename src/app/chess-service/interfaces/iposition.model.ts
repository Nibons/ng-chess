import { ICoordinate } from '@chess/icoordinate.model';
import { IPiece } from '@chess/ipiece.model';
export interface IPosition {
  id: number;
  position: ICoordinate;
  piece?: IPiece;
}
