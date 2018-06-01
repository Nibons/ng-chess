import { IPosition } from '@chess/iposition';
import { Observable } from 'rxjs';
import { IPiece } from '@chess/ipiece';

export interface IBoard {
  direction: IPosition[];
  positionList$: Observable<IPosition>;
  activePieces$: Observable<IPiece>;
}
