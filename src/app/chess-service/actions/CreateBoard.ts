import { IdAndStateTemplate } from './../interfaces/GameState.model';
import { IBoardDimensions } from '@chess/icoordinates.model';
import { BoardStateModel } from '@chess/iboard.model';
import { Store } from '@ngxs/store';
import { Guid } from '@chess/guid';

export class CreateBoard {
  static readonly type = '[Board] CreateBoard';
  public payload: BoardStateModel;
  public range;
  public boardId;
  private getTotalPositionCount(range: IBoardDimensions): number {
    let multiplier = 1;
    range.max.dimensions.forEach((value, index) => {
      multiplier = multiplier * (value - range.min.dimensions[index] + 1);
    });
    return multiplier;
  }

  constructor(board: BoardStateModel, public gameIdAndTemplate: IdAndStateTemplate, public store: Store) {
    this.range = board.range;
    this.boardId = Guid.newGuid();
    this.payload = {
      gameId: gameIdAndTemplate.Id,
      Id: this.boardId,
      totalPositionCount: this.getTotalPositionCount(this.range),
      direction: board.direction,
      range: board.range,
      positions: []
    };
  }
}
