import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';

export class Dimensions {
  constructor(
    public min: IPosition = new Coordinates(0, 0),
    public max: IPosition = new Coordinates(7, 7)) { }
}
