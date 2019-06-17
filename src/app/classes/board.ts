import { IBoard } from 'src/app/interfaces/iboard';
import { ICoordinate } from 'src/app/interfaces/icoordinate';
import { Coordinates } from 'src/app/classes/coordinates';
import { IPosition } from 'src/app/interfaces/iposition';
import { Position } from 'src/app/classes/position';

export class Board implements IBoard {

  static readonly defaultBoardMin: ICoordinate = { dimensions: [0, 0] };
  static readonly defaultBoardMax: ICoordinate = { dimensions: [7, 7] };
  positions: IPosition[];
  boardNumber: number;

  constructor({ positions = [], boardNumber = 0 }: Partial<IBoard>) {
    this.positions = positions;
    this.boardNumber = boardNumber;
  }

  private static populate(max: ICoordinate, lastAdded = new Coordinates({}), board = new Board({})): IBoard {
    const nextToAdd = Coordinates.increment(lastAdded);
    if (Coordinates.sum(nextToAdd) > Coordinates.sum(max)) {
      return board;
    }
    const nextPosition = new Position({ coordinates: nextToAdd, boardNumber: board.boardNumber });
    const boardWithNewPosition = new Board({ boardNumber: board.boardNumber, positions: [...board.positions, nextPosition] });
    return Board.populate(max, nextToAdd, boardWithNewPosition);
  }

  // static create(min: ICoordinate, max: ICoordinate, id = 0): IBoard {
  static create(min: ICoordinate, max: ICoordinate, id: number): IBoard {
    const staringBoard = new Board({
      positions: [new Position({ boardNumber: id, coordinates: min })],
      boardNumber: id
    });
    return Board.populate(max, min, staringBoard);
  }
}
