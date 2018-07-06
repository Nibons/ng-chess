import { IdAndStateTemplate } from './../interfaces/GameState.model';
export class CreateAllBoards {
  static readonly type = '[Board] CreateAllBoards';
  constructor(public gameIdAndTemplate: IdAndStateTemplate) { }
}
