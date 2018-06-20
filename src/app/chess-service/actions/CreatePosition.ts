import { PositionStateModel } from '@chess/iposition.model';

export class CreatePosition {
  static readonly type = '[Positions] CreatePosition';
  constructor(public payload: PositionStateModel) { }
}
