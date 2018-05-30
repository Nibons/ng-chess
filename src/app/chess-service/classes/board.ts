import { IBoardConstructor } from '@chess/i-board-constructor.model';
import { Game } from '@chess/game';
import { IPlayer } from '@chess/iplayer.model';
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
import { BasePlayer } from '@chess/base-player';
import { IPieceConstructor } from '@chess/ipiece-constructor.model';

export class Board extends ChessObject {
  readonly friendlyFire;
  readonly dimensions: IDimensions;
  readonly playerColors: string[];
  activePieces: IPiece[];
  positionList: Position[];
  public players: IPlayer[];

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
  static PopulatePieces(pieces: IPieceConstructor[], board: Board, game: Game) {
    const taskList: Promise<void>[] = new Array();
    pieces.forEach(pieceTemplate => taskList.push(Board.AddPiece(pieceTemplate, board, game)));
    taskList.forEach(task => async () => await task);
  }
  static AddPiece(
    template: IPieceConstructor,
    board: Board,
    game: Game
  ): Promise<void> {
    const position = board.getPositionAt(new Coordinates(template.positionArray));
    const player = BasePlayer.getPlayerByNumber(template.playerNumber, game);
    return new Promise<void>(resolve => BasePiece.PieceFactory(template.pieceType, position, player, board));
  }

  constructor(
    boardConfig: IBoardConstructor,
    public game: Game
  ) {
    super();
    this.friendlyFire = boardConfig.friendlyFire;
    this.dimensions = boardConfig.dimensions;
    this.CreateAllBoardPositions();
  }





  RemovePiece(piece: IPiece): void {
    this.activePieces = this.activePieces.filter(boardPiece => piece.id !== boardPiece.id);
  }

  IsValidPosition(position: IPosition, board: Board = this): boolean { return Board.IsPositionOnGameBoard(position, board); }
  getPositionAt(position: IPosition, board: Board = this): IPosition { return Board.getPositionAt(position, board); }
  PositionOnGameBoard(position: IPosition, board: Board = this): boolean { return Board.IsPositionOnGameBoard(position, board); }

  // Create all the places on the board
  private CreateAllBoardPositions(): void {
    for (let xPosition = this.dimensions.min.x; xPosition <= this.dimensions.max.x; xPosition++) {
      for (let yPosition = this.dimensions.min.y; yPosition <= this.dimensions.max.y; yPosition++) {
        this.positionList.push(new Position(xPosition, yPosition, this));
      }
    }
  }
}
