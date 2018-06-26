import { GameStateModel } from '@chess//GameState.model';
export class CreateAllBoards {
  static readonly type = '[Boards] CreateAllBoards';
  constructor(public gameInfo: GameStateModel) { }
}
