import { ETeam } from '../enums/eteam.enum';
import { Position } from '../classes/position';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Board } from '../classes/board';
import { IPosition } from '../interfaces/iposition';
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
