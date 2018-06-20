import { GameStateModel } from '@chess/GameState.model';
export class SetGame {
  public static readonly type = '[Game] SetGame';
  constructor(public game: GameStateModel) { }
}
