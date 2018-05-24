import { ETeam } from '@chess/eteam.enum';
import { Position } from '@chess/position';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Board } from '@chess/board';
import { IPosition } from '@chess/iposition';
import { Observable } from 'rxjs';

export interface IPiece {
  readonly pieceType: EPieceType;
  position: IPosition;
  threat$: Observable<IPosition[]>;
  HasMoved(): boolean;
  getAvailableMoves(): IPosition[];
  HasMoves(): boolean;
  GetThreatPositionList(): IPosition[];
}
