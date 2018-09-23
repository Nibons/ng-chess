import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
export interface IPlayerTemplate {
  playerNumber: number;
  playerColor: string;
  pieceOrientation: ICoordinates;
  viewOrientation: number;
}
