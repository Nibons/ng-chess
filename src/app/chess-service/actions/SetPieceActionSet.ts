import { IPieceActor } from '@chess/IPieceActor.model';
import { PieceStateModel } from '@chess/ipiece.model';
export class SetPieceActionSet {
  static readonly type = '[piece] SetPieceActionSet';
  constructor(public piece: PieceStateModel, pieceActor: IPieceActor) {

  }
}
