import { ICoordinates, IBoardDimensions } from '@chess/icoordinates.model';
export abstract class Coordinates {
  static IsSameCoordinates(
    coordinates: ICoordinates,
    compareCoordinates: ICoordinates): boolean {
    let test = true;
    coordinates.dimensions.forEach(
      (value, axis) => test = value === compareCoordinates.dimensions[axis]
    );
    return test;
  }

  static GetDelta(
    coordinates: ICoordinates,
    delta: ICoordinates
  ): ICoordinates {
    const newCoordinates = { dimensions: [0, 0, 0] };
    coordinates.dimensions.forEach(
      (value, axis) => newCoordinates.dimensions[axis] = value + delta.dimensions[axis]
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
          (value, axis) => {
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

  static MaxCoordinate(axisCount: number = 2, MaxDimensionValue = Number.MAX_SAFE_INTEGER): ICoordinates {
    const newCoord = new Array(axisCount);
    newCoord.fill(MaxDimensionValue);
    return { dimensions: newCoord };
  }

  static GetCoordinatesInDirection(
    coordinates: ICoordinates,
    direction: ICoordinates,
    min: ICoordinates = Coordinates.GetOrigin(coordinates.dimensions.length),
    max: ICoordinates = Coordinates.MaxCoordinate(coordinates.dimensions.length),
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

  static getBoardDimensionsDigitValue(boardDimensions: IBoardDimensions): number[] {
    const dimensionDigitValue: number[] = [];
    let digit_multiplier = 1;
    boardDimensions.max.dimensions.forEach((max, d) => {
      const dimensionLength = boardDimensions.max.dimensions[d] - boardDimensions.min.dimensions[d];
      dimensionDigitValue[d] = dimensionLength * digit_multiplier;
      digit_multiplier = digit_multiplier + dimensionDigitValue[d];
    });
    return dimensionDigitValue;
  }

  static getCoordinateFromDecimal(
    decimal: number,
    dimensionDigitValue: number[],
    originCoordinates: ICoordinates = { dimensions: new Array(dimensionDigitValue.length).fill(0) }
  ): ICoordinates {
    const reversedTempCoordinates = originCoordinates.dimensions.reverse();
    const reversedDigitLookup = dimensionDigitValue.reverse();
    let remainingDecimal = decimal;
    for (let d = 0; remainingDecimal > 0; d++) {
      if (remainingDecimal >= reversedDigitLookup[d]) {
        const decimalValue = Math.floor(remainingDecimal / reversedDigitLookup[d]);
        reversedTempCoordinates[d] += decimalValue;
        remainingDecimal -= decimalValue * reversedDigitLookup[d];
      }
    }
    return { dimensions: reversedTempCoordinates.reverse() };
  }

  static getDecimalFromMaxCoordinates({ min, max }: IBoardDimensions): number {
    const boardDimensionsDigitValue = Coordinates.getBoardDimensionsDigitValue({ min, max });
    let maxAsInt = 0;
    max.dimensions.reverse().forEach((val, i) => {
      maxAsInt += (val * boardDimensionsDigitValue[i]);
    });
    return maxAsInt;
  }

}
