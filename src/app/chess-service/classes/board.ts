import { IPiece } from '../interfaces/ipiece';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Position } from './position';
import { IPosition } from '../interfaces/iposition';
import { Coordinates } from './coordinates';

const xMinimum = 1;
const xMaximum = 8;
const yMinimum = 1;
const yMaximum = 8;

export class Board {
  activePieces: IPiece[];
  places: Position[];

  constructor(
    readonly xMin: number = xMinimum,
    readonly xMax: number = xMaximum,
    readonly yMax: number = yMinimum,
    readonly yMin: number = yMaximum
  ) {
    this.CreateAllBoardPositions(xMin, xMax, yMin, yMax);
  }

  // Create all the places on the board
  private CreateAllBoardPositions(xMin: number, xMax: number, yMax: number, yMin: number) {
    for (let xPosition = xMin; xPosition <= xMax; xPosition++) {
      for (let yPosition = yMin; yPosition <= yMax; yPosition++) {
        this.places.push(new Position(xPosition, yPosition));
      }
    }
  }

  getPositionAt(position: IPosition): Position {
    return this.places.filter(
      (pos: Position) => pos.IsSamePosition(position)
    )[0];
  }

  private IsPositionOnGameBoard(position: IPosition): boolean {
    return (position.x <= this.xMax) &&
      (position.x >= this.xMin) &&
      (position.y <= this.yMax) &&
      (position.y >= this.yMin);
  }
  IsValidPosition(position: IPosition): boolean {
    return this.IsPositionOnGameBoard(position);
  }
}
