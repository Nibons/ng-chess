import { IPosition } from '@chess/iposition';
import { IPiece } from '@chess/ipiece';
import { EPieceType } from '@chess/e-piece-type.enum';

export interface IMove {
  piece: IPiece;
  position: IPosition;
  type?: EPieceType; // only used when promoting a pawn!
}
