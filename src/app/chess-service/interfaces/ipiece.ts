import { ETeam } from '../enums/eteam.enum';
import { Position } from '../classes/position';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Board } from '../classes/board';

export interface IPiece {
  pieceType: EPieceType;
  position: Position;
  IsAlive(): boolean;
  getAvailableMoves(): Position[];
  HasMoves(): boolean;
  getThreatList(): Position[];
  HasMoved(): boolean;
  AddThreatAtPosition(Position): void;
}
