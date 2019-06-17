import { IPosition } from 'src/app/interfaces/iposition';
import { ICoordinate } from 'src/app/interfaces/icoordinate';
import { Coordinates } from 'src/app/classes/coordinates';

export class Position implements IPosition {
  boardNumber: number;
  coordinates: ICoordinate;
  constructor({ boardNumber = 0, coordinates = new Coordinates({}) }: Partial<IPosition>) {
    this.boardNumber = boardNumber;
    this.coordinates = coordinates;
  }
}
