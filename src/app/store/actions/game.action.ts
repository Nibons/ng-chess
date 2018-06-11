import { OptionsStateModel } from '@chess/options.model';

export class IncrementIdCounter {
  static readonly type = '[IdCounter] IncrementIdCounter';
}
export class NewGame {
  static readonly type = '[Game] CreateGame';
  constructor(public payload: OptionsStateModel) { }
}
