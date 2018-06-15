import { Piece } from '@chess/piece';
import { BoardStateModel } from './../interfaces/iboard.model';
import { BoardState } from './../states/board-state';
import { PlacePiece } from '@chess/position.action';
import { Guid } from '@chess/guid';
import { PieceStateModel } from '@chess/ipiece.model';
import { Store } from '@ngxs/store';

export class CreatePiece {
  static readonly type = '[Piece] CreatePiece';
  public piece: PieceStateModel;
  constructor(
    inputpiece: PieceStateModel,
    public gameId: Guid,
    private store: Store
  ) { }
}

export class SetPiece {
  static readonly type = '[Piece] SetPiece';
  constructor(public payload: PieceStateModel) { }
}

export class SetPieceProperty {
  static readonly type = '[Piece] SetPieceProperty';
  constructor(public payload: Partial<PieceStateModel>) { }
}
