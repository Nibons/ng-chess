import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';
import { Guid } from '@chess/guid';
import { PieceState } from '@chess/piece-state';

export class AllPiecesOnBoardCreated {
  static readonly type = '[Pieces] AllPiecesCreated';
  public pieceInfo;
  constructor(public gameInfo, public pieces: PieceStateModel[]) {
    this.pieceInfo = gameInfo.template.configStateTemplates.pieces.pieces;
  }
}
