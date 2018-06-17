export class DeleteBoard {
  static readonly type = '[Board] DeleteBoard';
  public payload: number;
  constructor(boardId: number) { this.payload = boardId; }
}
