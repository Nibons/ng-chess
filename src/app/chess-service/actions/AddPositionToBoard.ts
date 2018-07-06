import { PositionStateModel } from '@chess/IPosition.model';
import { Guid } from '@chess/guid';
export class AddPositionToBoard {
  public static readonly type = '[Positions] AddPositionToBoard';
  constructor(public position: PositionStateModel, public boardId: Guid, public gameInfo) { }
}
