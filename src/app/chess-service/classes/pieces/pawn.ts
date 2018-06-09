import { PieceActions } from '@chess/pieces/piece-actions';
import { IPieceActions } from '@chess/ipiece-actions.model';
import { IPiece, PieceStateModel } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { Coordinates } from '@chess/coordinates';
import { ICoordinates } from '@chess/icoordinates.model';
import { Store } from '@ngxs/store';

export class Pawn extends PieceActions implements IPieceActions {
  GetThreatPositionIds(piece: PieceActions): number[] {
    return Pawn.GetPawnThreat(piece);
  }
  GetPotentialMovePositionIds(piece: PieceActions): number[] {
    throw new Error('Method not implemented.');
    // const potentialMoves = [];
    // const direction = this.board.direction[this.playerNumber];
    // const position1 = this.board.GetPositionAt(Coordinates.GetDelta(this.coordinates, { dimensions: direction }));
    // if (position1.IsEmpty) {
    //   potentialMoves.push(position1.Id);
    //   if (!this.HasMoved) {
    //     const position2 = this.board.GetPositionAt(Coordinates.GetDelta(position1.coordinates, { dimensions: direction }));
    //     if (position2.IsEmpty) {
    //       potentialMoves.push(position2.Id);
    //     }
    //   }
    // }
    // return potentialMoves;
  }
  readonly value = 1;
  readonly pieceType = EPieceType.pawn;
  static GetPawnThreat(piece: PieceActions): number[] {
    const position_cache = [];
    piece.GetPositionsInDirectionUntilEmpty({ dimensions: [-1, 1] }, 1).forEach(pos => position_cache.push(pos));
    piece.GetPositionsInDirectionUntilEmpty({ dimensions: [1, -1] }, 1).forEach(pos => position_cache.push(pos));
    return position_cache;
  }

  SetPotentialMoves(): void {

  }
  constructor(coordinates: ICoordinates, store: Store) {
    super(coordinates, store);
  }
}
