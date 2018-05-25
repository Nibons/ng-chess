import { IPlayer } from './../interfaces/iplayer.model';
import { BasePiece } from '@chess/base-piece';
import { CPiece } from './config/cpiece';
import { CBoard } from './config/cboard';
import { IPiece } from '@chess/ipiece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Position } from '@chess/position';
import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { ChessObject } from '@chess/chess-object';
import { IDimensions } from '@chess/idimensions.model';

export class Board extends ChessObject {
  readonly dimensions: IDimensions;
  players: IPlayer[];
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
    boardConfig: CBoard,
    piecesConfig: CPiece[],
    players: IPlayer[],
  ) {
    super();
    this.dimensions = boardConfig.dimensions;
    this.players = players;
    this.CreateAllBoardPositions();
  }

  IsValidPosition(position: IPosition, board: Board = this): boolean { return board.IsPositionOnGameBoard(position); }
  getPositionAt(position: IPosition, board: Board = this): IPosition { return Board.getPositionAt(position, board); }
  PositionOnGameBoard(position: IPosition, board: Board = this): boolean { return Board.IsPositionOnGameBoard(position, board); }

  //Create all the places on the board
  pivate CreateAllBoardPositions(
    xMin: number = this.dimensions.min.x,
    ax: number = this.dimensions.max.x,
      : number = this.dimensions.min.y,
    ax: number = this.dimensions.max.x) {
    for (let xPosition = xMin; xPosition <= xMax; xPosition++) {
      for (let yPosition = yMin; yPosition <= yMax; yPosition++) {
        this.positionList.push(new Position(xPosition, yPosition, this));
      }
    }
  }

}
