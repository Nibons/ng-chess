import { CBoard } from './config/cboard';
import { IPiece } from '@chess/ipiece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Position } from '@chess/position';
import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { ChessObject } from '@chess/chess-object';
import { Dimensions } from '@chess/dimensions';

export class Board extends ChessObject {
  readonly dimensions: Dimensions;
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
    return Board.IsWithinRange(
      position.x,
      board.dimensions.min.x,
      board.dimensions.max.x) &&
      Board.IsWithinRange(
        position.y,
        board.dimensions.min.y,
        board.dimensions.max.y);
  }
  static IsWithinRange(testNumber: Number, lowerBound: number, upperBound: number): boolean {
    return testNumber >= lowerBound && testNumber <= upperBound;
  }

  constructor(
    boardConfig: CBoard
  ) {
    super();
    this.dimensions = boardConfig.dimensions;
    this.CreateAllBoardPositions();
  }

  IsValidPosition(position: IPosition, board: Board = this): boolean { return board.IsPositionOnGameBoard(position); }
  getPositionAt(position: IPosition, board: Board = this): IPosition { return Board.getPositionAt(position, board); }
  IsPositionOnGameBoard(position: IPosition, board: Board = this): boolean { return Board.IsPositionOnGameBoard(position, board); }

  // Create all the places on the board
  private CreateAllBoardPositions(
    xMin: number = this.dimensions.min.x,
    xMax: number = this.dimensions.max.x,
    yMin: number = this.dimensions.min.y,
    yMax: number = this.dimensions.max.x) {
    for (let xPosition = xMin; xPosition <= xMax; xPosition++) {
      for (let yPosition = yMin; yPosition <= yMax; yPosition++) {
        this.positionList.push(new Position(xPosition, yPosition, this));
      }
    }
  }
}
