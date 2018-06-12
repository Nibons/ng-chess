import { ICoordinates } from '@chess/icoordinates.model';
export interface ICoordinates {
  dimensions: number[];
}
export interface IBoardDimensions {
  min: ICoordinates;
  max: ICoordinates;
  boardDimensionsDigitValue?: ICoordinates;
}
