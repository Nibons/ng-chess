import { EPieceType } from 'src/app/enums/epiece-type.enum';
import { IPosition } from 'src/app/interfaces/iposition';

export interface IPiece {
  playerNumber: number;
  pieceType: EPieceType;
  position: IPosition;
  hasMoved: boolean;
}
