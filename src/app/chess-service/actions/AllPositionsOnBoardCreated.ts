import { PositionStateModel } from '@chess/iposition.model';
import { Guid } from '@chess/guid';

export class AllPositionsOnBoardCreated {
  static readonly type = '[Board] AllPositionsOnBoardCreated';
  constructor(public gameInfo, public boardId: Guid, public positions: PositionStateModel[]) { }
}
