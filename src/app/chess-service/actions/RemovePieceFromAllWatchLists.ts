import { Guid } from '@chess/guid';
export class RemovePieceFromAllWatchLists {
  public static readonly type = '[Positions] RemovePieceFromAllWatchLists';
  constructor(public pieceId: Guid) { }
}
