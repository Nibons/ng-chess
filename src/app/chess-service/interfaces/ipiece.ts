import { ETeam } from "../enums/eteam.enum";
import { Position } from "../classes/position";
import { EPieceType } from "../enums/e-piece-type.enum";
import { Board } from "../classes/board";

export interface IPiece {
  alive: boolean;
  pieceType: EPieceType;
  position: Position;
  move(target_position: Position);
  attack(target_position: Position);
  availableMoves(): Position[];
}
