export class AddToPositionWatchList {
  public static readonly type = '[positions] AddToPositionWatchList';
  constructor(public pieceId: number, public positionId: number) { }
}
