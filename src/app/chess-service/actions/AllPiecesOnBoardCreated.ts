import { PieceStateModel } from '@chess/ipiece.model';

export class AllPiecesOnBoardCreated {
  static readonly type = '[Piece] AllPiecesOnBoardCreated';
  public pieceInfo;
  constructor(public gameInfo, public pieces: PieceStateModel[]) {
    console.log('AllPiecesOnBoardCreated');
    this.pieceInfo = gameInfo.template.configStateTemplates.pieces.pieces;
  }
}
