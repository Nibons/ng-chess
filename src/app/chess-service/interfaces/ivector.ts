import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';

export interface IVector {
  startingPosition: ICoordinates;
  line: ICoordinates[];
}
