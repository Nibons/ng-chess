import { ICoordinates, defaultCoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { EPieceType } from 'src/app/chess-service/enums/e-piece-type.enum';

export interface IPieceData {
  playerNumber: number;
  pieceType: EPieceType;
  coordinates: ICoordinates;
  HasMoved: boolean;
  IsVital: boolean;
  boardNumber: number;
}

export const pieceDefaults: IPieceData = {
  IsVital: false,
  boardNumber: 0,
  HasMoved: false,
  playerNumber: 0,
  pieceType: EPieceType.base,
  coordinates: defaultCoordinates
};

