import { BoardStateModel } from '@chess/iboard.model';
import { IdAndStateTemplate } from '@chess/GameState.model';

export class AddBoardToGame {
  static readonly type = '[Board] AddBoardToGame';
  constructor(public board: BoardStateModel, public IdAndTemplate: IdAndStateTemplate) { }
}
