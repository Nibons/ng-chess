import { Guid } from '@chess/guid';
import { IPieceActor } from '@chess/IPieceActor.model';
import { PieceStateModel } from '@chess/ipiece.model';
export class SetPieceActionSet {
  static readonly type = '[piece] SetPieceActionSet';
  public payload = {
    Id: null,
    threatList: [],
    potentialMoves: []
  };
  constructor(piece: PieceStateModel, pieceActor: IPieceActor) {
    this.payload.Id = piece.Id;
    this.payload.threatList = pieceActor.GetThreatPositionIds(piece);
    this.payload.potentialMoves = pieceActor.GetPotentialMovePositionIds(piece);
  }
}
