import { PositionStateModel } from '@chess/iposition.model';

export class CreatePosition {
  static readonly type = '[Position] CreatePosition';
  constructor(public payload: PositionStateModel) { }
}
