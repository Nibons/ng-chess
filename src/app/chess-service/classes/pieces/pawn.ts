import { Piece } from '@chess/pieces/piece';
import { IPiece } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { Coordinates } from '@chess/coordinates';

export class Pawn extends Piece implements IPiece {
  readonly value = 1;
  readonly pieceType = EPieceType.pawn;
  static RefreshPawnThreat(piece: IPiece): Guid[] {
    const position_cache: Guid[] = [];
    Piece.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [-1, 1] }, 1).forEach(pos => position_cache.push(pos));
    Piece.GetPositionsInDirectionUntilEmpty(piece, { dimensions: [1, -1] }, 1).forEach(pos => position_cache.push(pos));
    return position_cache;
  }
  RefreshThreatList() { Pawn.RefreshPawnThreat(this); }
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
