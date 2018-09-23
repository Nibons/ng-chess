import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
export interface IBoardDimensions {
  min: ICoordinates;
  max: ICoordinates;
}
