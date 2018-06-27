import { GameStateModel } from '@chess//GameState.model';
export class CreateAllBoards {
  static readonly type = '[Board] CreateAllBoards';
  constructor(public gameInfo: GameStateModel) { }
}
