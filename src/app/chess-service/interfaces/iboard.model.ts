import { IPosition } from '@chess/iposition';
import { Observable } from 'rxjs';
import { IPiece } from '@chess/ipiece';
import { IGameItem } from '@chess/igame-item.model';

export interface IBoard extends IGameItem {
  direction: IPosition[];
  positionList$: Observable<IPosition>;
  activePieces$: Observable<IPiece>;
  IsWithinBounds(coordinates: IPosition): boolean;
  GetPositionAt(coordinates: IPosition): IPosition;
}
