import { Coordinates } from './coordinates';
import { ICoordinates } from '../interfaces/icoordinates.model';
import { IVector } from 'src/app/chess-service/interfaces/ivector';

const maxIteration = Number.MAX_SAFE_INTEGER;

// Cardinal Directions
const north: ICoordinates = { dimensions: [0, 1] }
const south: ICoordinates = { dimensions: [0, -1] }
const east: ICoordinates = { dimensions: [1, 0] }
const west: ICoordinates = { dimensions: [-1, 0] }
const cardinalDirections = [north, south, east, west]

// Diagonal Directions
const northEast: ICoordinates = { dimensions: [1, 1] }
const southEast: ICoordinates = { dimensions: [1, -1] }
const northWest: ICoordinates = { dimensions: [-1, 1] }
const southWest: ICoordinates = { dimensions: [-1, -1] }
const diagonalDirections = [northEast, southEast, northWest, southWest]

const allDirections = [...cardinalDirections, ...diagonalDirections]

export class VectorLibrary {

  constructor() { }

  private static GetDirectionalVector(
    startingPosition: ICoordinates,
    direction: ICoordinates,
    max: number = maxIteration): IVector {
    return {
      startingPosition: startingPosition,
      line: Coordinates.GetCoordinatesInDirection(
        startingPosition,
        direction,
        Coordinates.GetOrigin(startingPosition.dimensions.length),
        Coordinates.GetMaxCoordinate(startingPosition.dimensions.length),
        max)
    };
  }

  // cardinal vectors
  static GetNorthVector(startingPosition: ICoordinates, max: number = maxIteration): IVector {
    return VectorLibrary.GetDirectionalVector(startingPosition, north, max);
  }

  static GetSouthVector(startingPosition: ICoordinates, max: number = maxIteration): IVector {
    return VectorLibrary.GetDirectionalVector(startingPosition, south, max);
  }

  static GetEastVector(startingPosition: ICoordinates, max: number = maxIteration): IVector {
    return VectorLibrary.GetDirectionalVector(startingPosition, east, max);
  }

  static GetWestVector(startingPosition: ICoordinates, max: number = maxIteration): IVector {
    return VectorLibrary.GetDirectionalVector(startingPosition, west, max);
  }

  // diagonalVectors
  static GetNorthEastVector(startingPosition: ICoordinates, max: number = maxIteration): IVector {
    return VectorLibrary.GetDirectionalVector(startingPosition, northEast, max);
  }
  static GetSouthEastVector(startingPosition: ICoordinates, max: number = maxIteration): IVector {
    return VectorLibrary.GetDirectionalVector(startingPosition, southEast, max);
  }
  static GetNorthWestVector(startingPosition: ICoordinates, max: number = maxIteration): IVector {
    return VectorLibrary.GetDirectionalVector(startingPosition, northWest, max);
  }
  static GetSouthWestVector(startingPosition: ICoordinates, max: number = maxIteration): IVector {
    return VectorLibrary.GetDirectionalVector(startingPosition, southWest, max);
  }

  // combined vectors
  static GetCardinalDirectionVectorList(startingPosition: ICoordinates, max: number = maxIteration): IVector[] {
    return [
      VectorLibrary.GetNorthVector(startingPosition, max),
      VectorLibrary.GetSouthVector(startingPosition, max),
      VectorLibrary.GetEastVector(startingPosition, max),
      VectorLibrary.GetWestVector(startingPosition, max)
    ];
  }
  static GetDiagonalDirectionVectorList(startingPosition: ICoordinates, max: number = maxIteration): IVector[] {
    return [
      VectorLibrary.GetNorthEastVector(startingPosition, max),
      VectorLibrary.GetNorthWestVector(startingPosition, max),
      VectorLibrary.GetSouthEastVector(startingPosition, max),
      VectorLibrary.GetSouthWestVector(startingPosition, max),
    ]
  }
  static GetAllDirectionsVectorList(startingPosition: ICoordinates, max: number = maxIteration): IVector[] {
    return [
      ...VectorLibrary.GetCardinalDirectionVectorList(startingPosition, max),
      ...VectorLibrary.GetDiagonalDirectionVectorList(startingPosition, max)
    ];
  }

}
