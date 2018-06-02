import { IDimensions } from '@chess/idimensions.model';
import { ICoordinate } from './../interfaces/icoordinate.model';
import { IPosition } from "@chess/iposition.model";
import { IBoard } from "@chess/iboard.model";

export class Position implements IPosition {
  id: number;
  boardId: number;
  pieceId: number[];
  coordinates: ICoordinate;
  get board(boardId = this.boardId): IBoard {
    return Board.FindBoard(boardId);
  }
  get IsOnBoard(): boolean {
    const board = this.board;
    return
  }
  ProcessThreatInDirection(
    position: IPosition,
    delta: Coordinates,
    board: IBoard,
    remainingInDirection: number
  ): IPosition[] {
    const position_cache: IPosition[] = new Array();
    let i = 1;
    for (
      let position = this.;
      position.IsOnBoard && position.IsEmpty && i <= maxCount;
      i++
    ) {

    }
    return position_cache;
  }
  getDelta(delta: ICoordinate): IPosition {

  }
}
