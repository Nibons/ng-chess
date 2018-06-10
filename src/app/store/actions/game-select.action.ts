import { GameStateModel } from '@chess/igame.model';
import { Guid } from '@chess/guid';

export class NewGame {
  static readonly type = '[GameSelect] NewGame';
  constructor(public payload: GameStateModel) {
    payload.Id = Guid.newGuid();
    payload.IdCounter = 0;
  }
}
