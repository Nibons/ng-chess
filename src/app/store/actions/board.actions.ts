import { ICoordinates, IBoardDimensions } from '@chess/icoordinates.model';
import { Guid } from '@chess/guid';
import { BoardStateModel, IBoard } from '@chess/iboard.model';
export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  constructor(
    board: IBoard
  ) {
    this.payload = board;
  }
}
export class DeleteBoard {
  static readonly type = '[Board] DeleteBoard';
  public payload: number;
  constructor(boardId: number) { this.payload = boardId; }
}
