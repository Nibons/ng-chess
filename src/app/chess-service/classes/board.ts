import { IPiece } from '@chess/ipiece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Position } from '@chess/position';
import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { ChessObject } from '@chess/chess-object';

const xMinimum = 1;
const xMaximum = 8;
const yMinimum = 1;
const yMaximum = 8;

export class Board extends ChessObject {
  activePieces: IPiece[];
  positionList: Position[];

  static getPositionAt(position: IPosition, board: Board): IPosition {
    return board.positionList.filter(
      (pos: Position) => Position.IsSamePosition(position, pos) && Board.IsWithinGameBounds(pos, board)
    )[0];
  }
  static IsPositionOnGameBoard(position: IPosition, board: Board): boolean {
    return board.positionList.filter(
      (pos: IPosition) => board.getPositionAt(pos, board)
    ).length >= 1;
  }
  static IsWithinGameBounds(position: IPosition, board: Board): boolean {
    return Board.IsWithinRange(position.x, board.xMin, board.xMax) && Board.IsWithinRange(position.y, board.yMin, board.yMax);
  }
  static IsWithinRange(testNumber: Number, lowerBound: number, upperBound: number): boolean {
    return testNumber >= lowerBound && testNumber <= upperBound;
  }

  constructor(
    readonly xMin: number = xMinimum,
    readonly xMax: number = xMaximum,
    readonly yMax: number = yMinimum,
    readonly yMin: number = yMaximum
  ) {
    super();
    this.CreateAllBoardPositions(xMin, xMax, yMin, yMax);
  }

  IsValidPosition(position: IPosition, board: Board = this): boolean { return board.IsPositionOnGameBoard(position); }
  getPositionAt(position: IPosition, board: Board = this): IPosition { return Board.getPositionAt(position, board); }
  IsPositionOnGameBoard(position: IPosition, board: Board = this): boolean { return Board.IsPositionOnGameBoard(position, board); }

  // Create all the places on the board
  private CreateAllBoardPositions(xMin: number, xMax: number, yMax: number, yMin: number) {
    for (let xPosition = xMin; xPosition <= xMax; xPosition++) {
      for (let yPosition = yMin; yPosition <= yMax; yPosition++) {
        this.positionList.push(new Position(xPosition, yPosition, this));
      }
    }
  }
}
