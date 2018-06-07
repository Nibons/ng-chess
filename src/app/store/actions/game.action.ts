import { GameStateModel } from '@chess/igame.model';

export class IncrementIdCounter {
  static readonly type = '[IdCounter] IncrementIdCounter';
}
export class NewGame {
  static readonly type = '[Game] CreateGame';
  constructor(public payload: GameStateModel) { }
}
