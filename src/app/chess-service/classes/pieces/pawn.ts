import { PieceActions } from '@chess/pieces/piece-actions';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { Piece } from '@chess/pieces/piece';
import { IPiece, PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { Coordinates } from '@chess/coordinates';

export class Pawn extends PieceActions implements IPieceActions {
  GetThreatPositionIds(piece: PieceStateModel): number[] {
    return Pawn.GetPawnThreat(piece);
  }
  readonly value = 1;
  readonly pieceType = EPieceType.pawn;
  static GetPawnThreat(piece: PieceStateModel): number[] {
    const position_cache = [];
    PieceActions.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [-1, 1] }, 1).forEach(pos => position_cache.push(pos));
    PieceActions.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [1, -1] }, 1).forEach(pos => position_cache.push(pos));
    return position_cache;
  }

  SetPotentialMoves(): void {
    this.potentialMoves = [];
    const direction = this.position.Board.direction[this.playerNumber];
    const position1 = this.board.GetPositionAt(Coordinates.GetDelta(this.coordinates, { dimensions: direction }));
    if (position1.IsEmpty) {
      this.potentialMoves.push(position1.Id);
      if (!this.HasMoved) {
        const position2 = this.board.GetPositionAt(Coordinates.GetDelta(position1.coordinates, { dimensions: direction }));
        if (position2.IsEmpty) {
          this.potentialMoves.push(position2.Id);
        }
      }
    }
  }
}
