import { ETeam } from '../enums/eteam.enum';
import { Position } from '../classes/position';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Board } from '../classes/board';
import {IPosition} from '../interfaces/iposition';

export interface IPiece {
  readonly pieceType: EPieceType;
  position: Position;
  IsAlive(): boolean;
  getAvailableMoves(): Position[];
  HasMoves(): boolean;
  GetThreatPositionList(): IPosition[];
  HasMoved(): boolean;
}
