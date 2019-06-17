import { ICoordinate } from 'src/app/interfaces/icoordinate';
import { IncrementLowest } from 'src/app/classes/Common';

export class Coordinates implements ICoordinate {
  dimensions: number[];
  constructor({ dimensions = [0, 0] }: Partial<ICoordinate>) {
    this.dimensions = dimensions;
  }

  static increment(coord: ICoordinate): ICoordinate {
    return { dimensions: IncrementLowest(coord.dimensions) };
  }

  static sum({ dimensions }: ICoordinate): number {
    const reducer = (a: number, c: number) => a + c;
    return dimensions.reduce(reducer);
  }
}



