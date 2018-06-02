import { EPieceType } from '@chess/e-piece-type.enum';
import { ICoordinates } from '@chess/icoordinates.model';

export interface IPieceConstructor {
  playerNumber: number;
  pieceType: EPieceType;
  coordinates: ICoordinates;
  IsPrimary: boolean;
}
