import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';
import { Guid } from '@chess/guid';
import { PieceState } from '@chess/piece-state';

export class AllPiecesCreatedOnBoard {
  static readonly type = '[Pieces] AllPiecesCreated';
  public pieceInfo;
  constructor(public gameInfo, public pieces: PieceStateModel[], store: Store) {
    this.pieceInfo = gameInfo.template.configStateTemplates.pieces.pieces;
  }
}
