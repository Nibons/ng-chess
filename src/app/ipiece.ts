import { ETeam } from "./eteam.enum";
import { Position } from "./position";
import { EPieceType } from "./e-piece-type.enum";
import { Board } from "./board";

export interface IPiece {
  team: ETeam;
  alive: boolean;
  board: Board;
  pieceType: EPieceType;
  position: Position;
  move(target_position: Position);
  attack(target_position: Position);
  availableMoves(): Position[];
  kill();
}
