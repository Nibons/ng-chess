export class AddPositionToBoard {
  public static readonly type = '[Positions] AddPositionToBoard';
  public positionId: number;
  public boardId: number;

  constructor(Id: number, boardId: number) {
    this.positionId = Id;
    this.boardId = boardId;
  }
}
