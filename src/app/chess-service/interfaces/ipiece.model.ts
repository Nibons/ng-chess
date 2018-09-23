import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';

export interface IPiece {
  playerNumber: number;
  pieceType: EPieceType;
  coordinates: ICoordinates;
  HasMoved: boolean;
  IsVital: boolean;
  boardNumber: number;
}
