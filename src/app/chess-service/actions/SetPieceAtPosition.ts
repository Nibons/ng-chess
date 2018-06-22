import { PositionStateModel } from './../interfaces/iposition.model';
import { Guid } from '@chess/guid';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';
import { PositionState } from '@chess/position-state';
export class SetPieceAtPosition {
  static readonly type = '[Position] SetPieceAtPosition';
  constructor(public pieceId: Guid, public coordinates: ICoordinates, public boardId: Guid) { }
}
