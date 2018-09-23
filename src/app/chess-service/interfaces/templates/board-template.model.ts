import { IBoardDimensions } from 'src/app/chess-service/interfaces/iboard-dimensions.model';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
export interface IBoardTemplate {
  direction: ICoordinates;
  range: IBoardDimensions;
}
