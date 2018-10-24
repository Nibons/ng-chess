import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { of, Observable, from } from 'rxjs';

export class Coordinates implements ICoordinates {
  constructor(public dimensions: number[]) { }
  static IsSameCoordinates(
    coordinates: ICoordinates,
    compareCoordinates: ICoordinates
  ): boolean {
    let test = coordinates.dimensions.length === compareCoordinates.dimensions.length;
    for (let d = 0; test && d > coordinates.dimensions.length; d++) {
      test = coordinates.dimensions[d] === compareCoordinates.dimensions[d];
    }
    return test;
  }

  static GetDelta(
    coordinates: ICoordinates,
    delta: ICoordinates,
    multiplier: number = 1
  ): ICoordinates {
    const newCoordinates = { dimensions: [0, 0, 0] };
    coordinates.dimensions.forEach(
      (value, axis) => newCoordinates.dimensions[axis] = value + (delta.dimensions[axis] * multiplier)
    );
    return newCoordinates;
  }

  static GetDifference(
    coordinates: ICoordinates,
    delta: ICoordinates
  ): ICoordinates {
    const newCoordinates = { dimensions: [0, 0, 0] };
    coordinates.dimensions.forEach(
      (value, axis) => newCoordinates.dimensions[axis] = value - delta.dimensions[axis]
    );
    return newCoordinates;
  }

  static IsCoordinatesWithin(
    coordinates: ICoordinates,
    min: ICoordinates,
    max: ICoordinates
  ): boolean {
    let test = true;
    coordinates.dimensions.forEach(
      (value, axis) => test = test && value >= min.dimensions[axis] && value <= max.dimensions[axis]
    );
    return test;
  }

  static GetAdjacent(
    coordinates: ICoordinates
  ): ICoordinates[] {
    const coordinateList: ICoordinates[] = new Array;
    [-1, 1].forEach(
      multiplier => {
        coordinates.dimensions.forEach(
          (axis) => {
            const deltaDimensions: number[] = new Array(coordinates.dimensions.length);
            deltaDimensions.fill(0); // {x: 0, y:0}
            deltaDimensions[axis] = (1 * multiplier);
            const deltaCoordinate: ICoordinates = { dimensions: deltaDimensions };
            coordinateList.push(Coordinates.GetDelta(coordinates, deltaCoordinate));
          }
        );
      }
    );
    return coordinateList;
  }

  static GetOrigin(axisCount: number = 2, originDimensionValue = 0): ICoordinates {
    const newCoord = new Array(axisCount);
    newCoord.fill(originDimensionValue);
    return { dimensions: newCoord };
  }

  static GetMaxCoordinate(
    axisCount: number = 2,
    MaxDimensionValue = Number.MAX_SAFE_INTEGER
  ): ICoordinates {
    const newCoord = new Array(axisCount);
    newCoord.fill(MaxDimensionValue);
    return { dimensions: newCoord };
  }

  static GetCoordinatesInDirection(
    coordinates: ICoordinates,
    direction: ICoordinates,
    min: ICoordinates = Coordinates.GetOrigin(coordinates.dimensions.length),
    max: ICoordinates = Coordinates.GetMaxCoordinate(coordinates.dimensions.length),
    count: number = Number.MAX_SAFE_INTEGER,
    coordinateList: ICoordinates[] = new Array(), // used for recursion!
  ): ICoordinates[] {
    if (Coordinates.IsCoordinatesWithin(coordinates, min, max) && count > 0) {
      coordinateList.push(coordinates);
      const nextCoordinate = Coordinates.GetDelta(coordinates, direction);
      Coordinates.GetCoordinatesInDirection(
        nextCoordinate,
        direction,
        min,
        max,
        (count - 1),
        coordinateList
      );
    }
    return coordinateList;
  }

  static GetCoordinatesInDirection$(
    coordinates: ICoordinates,
    direction: ICoordinates,
    min: ICoordinates = Coordinates.GetOrigin(coordinates.dimensions.length),
    max: ICoordinates = Coordinates.GetMaxCoordinate(coordinates.dimensions.length),
    count: number = Number.MAX_SAFE_INTEGER,
    coordinateList: ICoordinates[] = new Array(), // used for recursion!
  ): Observable<ICoordinates> {
    return from(this.GetCoordinatesInDirection(coordinates, direction, min, max, count));
  }

  // Test1: origin:{dimensions:[0,0]},max:{dimensions:[7,7]}
  // Test1.length should == (0..7).length * (0..7).length
  // Test2: origin:{dimensions[0,0,0]},max:{dimensions:[4,3,2]}
  // Test2.length should == (0..4).length * (0..3).length * (0..2).length
  static GetAllCoordinatesWithin(origin: ICoordinates, max: ICoordinates): ICoordinates[] {
    const coordinate_list: ICoordinates[] = new Array<ICoordinates>();
    range(origin.dimensions[0], max.dimensions[0]).forEach(
      x_value => {
        range(origin.dimensions[1], max.dimensions[1]).forEach(
          y_value => {
            if (origin.dimensions.length > 2) {
              range(origin.dimensions[1], max.dimensions[1]).forEach(
                z_value => coordinate_list.push({ dimensions: [x_value, y_value, z_value] })
              );
            } else {
              coordinate_list.push({ dimensions: [x_value, y_value] });
            }
          }
        );
      }
    );
    return coordinate_list;
  }


  public IsEqual(coordinates: ICoordinates) {
    return Coordinates.IsSameCoordinates(this, coordinates);
  }
}

export function range(start: number, end: number, step?: number, offset?: number): number[] {
  const len = (Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1;
  const direction = start < end ? 1 : -1;
  const startingPoint = start - (direction * (offset || 0));
  const stepSize = direction * (step || 1);

  return Array(len).fill(0).map(function (_, index) {
    return startingPoint + (stepSize * index);
  });
}
