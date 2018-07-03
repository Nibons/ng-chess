import { Guid } from '@chess/guid';
import { EPieceType } from '@chess/e-piece-type.enum';

export interface IMove {
  player: Guid;
  piece: Guid;
  position: Guid;
  type?: EPieceType; // only used when promoting a pawn!
  additionalMoves?: IMove[];
}
