import { Guid } from '@chess/guid';
export class AddPositionToBoard {
  public static readonly type = '[Positions] AddPositionToBoard';
  constructor(public positionId: Guid, public boardId: Guid) { }
}
