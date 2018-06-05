import { IPosition } from '@chess/iposition.model';
import { IPiece } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';

export interface IMove {
  piece: IPiece;
  position: IPosition;
  type?: EPieceType; // only used when promoting a pawn!
}
