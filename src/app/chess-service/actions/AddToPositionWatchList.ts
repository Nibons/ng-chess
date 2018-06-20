import { Guid } from '@chess/guid';
export class AddToPositionWatchList {
  public static readonly type = '[positions] AddToPositionWatchList';
  constructor(public pieceId: Guid, public positionId: Guid) { }
}
