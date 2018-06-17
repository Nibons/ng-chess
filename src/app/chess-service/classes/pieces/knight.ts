import { IPieceActor } from './../../interfaces/IPieceActor.model';
import { BasePiece } from '@chess/pieces/BasePiece';
import { ICoordinates } from '@chess/icoordinates.model';
import { Coordinates } from '@chess/coordinates';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';

export class Knight extends BasePiece implements IPieceActor {
  readonly value = 3;
  readonly pieceType = EPieceType.knight;
  GetThreatPositionIds(): number[] {
    const threatList = [];
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
            (c: ICoordinates) => threatList.push(this.board.GetPositionAt(c).Id)
          );
      }
    }
    return threatList;
  }
  constructor(store: Store) {
    super(store);
  }
}
