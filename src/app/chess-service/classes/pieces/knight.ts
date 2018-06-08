import { IPieceActions } from '@chess/ipiece-actions.model';
import { PieceActions } from './piece-actions';
import { ICoordinates } from '@chess/icoordinates.model';
import { Piece } from '@chess/piece';
import { Coordinates } from '@chess/coordinates';
import { IPiece } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';

export class Knight extends PieceActions implements IPieceActions {
  readonly value = 3;
  readonly pieceType = EPieceType.knight;
  RefreshThreatList(): void {
    this.threatList = [];
    const directions = [1, -1];
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        [Coordinates.GetDelta(this.coordinates, { dimensions: [(2 * XDirection), YDirection] }),
        Coordinates.GetDelta(this.coordinates, { dimensions: [XDirection, (2 * YDirection)] })]
          .filter((c: ICoordinates) =>
            // filter down to coordinates on the board
            Coordinates.IsCoordinatesWithin(c, this.board.range.min, this.board.range.max))
          .forEach(
            // add the coordinates to this piece's threatList
            (c: ICoordinates) => this.threatList.push(this.board.GetPositionAt(c).Id)
          );
      }
    }
  }
}
