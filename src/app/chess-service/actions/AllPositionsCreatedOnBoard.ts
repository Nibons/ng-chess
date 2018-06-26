import { Guid } from '@chess/guid';

export class AllPositionsOnBoardCreated {
  static readonly type = '[Board] AllPositionsOnBoardCreated';
  public pieces;
  constructor(public gameInfo, public boardId: Guid) {
    this.pieces = gameInfo.template.configStateTemplates.pieces.pieces;
    console.log('AllPositionsOnBoardCreated');
  }
}
