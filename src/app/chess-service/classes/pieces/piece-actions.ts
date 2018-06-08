import { ICoordinates } from './../../interfaces/icoordinates.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { Bishop } from '@chess/pieces/bishop';
import { King } from '@chess/pieces/king';
import { Knight } from '@chess/pieces/knight';
import { Pawn } from '@chess/pieces/pawn';
import { Queen } from '@chess/pieces/queen';
import { Rook } from '@chess/pieces/rook';
import { PieceStateModel } from '@chess/ipiece.model';
import { Coordinates } from '@chess/coordinates';

export abstract class PieceActions implements IPieceActions {

  abstract value: number;
  abstract GetThreatPositionIds(piece: PieceStateModel): number[];
  GetPotentialMovePositionIds(piece: PieceStateModel): number[] {
    return piece.threatList;
  }
  // this makes the pieceAction what it is supposed to be
  static PieceActionFactory(pieceType: EPieceType): IPieceActions {
    switch (pieceType) {
      case EPieceType.bishop: { return new Bishop(); }
      case EPieceType.king: { return new King(); }
      case EPieceType.knight: { return new Knight(); }
      case EPieceType.pawn: { return new Pawn(); }
      case EPieceType.queen: { return new Queen(); }
      case EPieceType.rook: { return new Rook(); }
    }
  }
  static GetPositionsInDirectionUntilEmpty(piece: PieceStateModel, direction: ICoordinates, count = Number.MAX_SAFE_INTEGER): number[] {
    const position_cache = [];
    const coordinates_in_direction = Coordinates.GetCoordinatesInDirection(
      piece.coordinates,
      direction,
      piece.board.range.min,
      piece.board.range.max,
      count
    );
    let continue_this_direction = true;
    for (let i = 0; continue_this_direction; i++) {
      const pos = piece.board.GetPositionAt(coordinates_in_direction[i]);
      position_cache.push(pos.Id);
      continue_this_direction = pos.IsEmpty;
    }
    return position_cache;
  }
}
