import { Guid } from '@chess/guid';

export class DeleteBoard {
  static readonly type = '[Board] DeleteBoard';
  public payload: Guid;
  constructor(boardId: Guid) { this.payload = boardId; }
}
