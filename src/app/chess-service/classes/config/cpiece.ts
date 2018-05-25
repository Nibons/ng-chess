import { IPosition } from '@chess/iposition';
import { EPieceType } from '@chess/e-piece-type.enum';

export class CPiece {
  position: IPosition;
  type: EPieceType;
  playerNumber: number;
}
