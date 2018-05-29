import { EPieceType } from '@chess/e-piece-type.enum';

export interface IPieceConstructor {
  playerNumber: number;
  pieceType: EPieceType;
  positionArray: number[];
  primary: boolean;
}
