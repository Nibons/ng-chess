import { IPieceActor } from '@chess/IPieceActor.model';
import { BasePiece } from '@chess/pieces/BasePiece';
import { ICoordinates } from '@chess/icoordinates.model';
import { Coordinates } from '@chess/coordinates';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Store } from '@ngxs/store';
import { PieceStateModel } from '@chess/ipiece.model';

export class Knight extends BasePiece implements IPieceActor {
  readonly value = 3;
  readonly pieceType = EPieceType.knight;
  GetThreatPositionIds(piece: PieceStateModel): number[] {
    return Knight.GitKnightThreatList(piece, this);
  }
  public static GitKnightThreatList(piece: PieceStateModel, pieceActor: IPieceActor): number[] {
    const threatList = [];
    const directions = [1, -1];
    const board = pieceActor.GetBoard(piece);
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        [Coordinates.GetDelta(piece.coordinates, { dimensions: [(2 * XDirection), YDirection] }),
        Coordinates.GetDelta(piece.coordinates, { dimensions: [XDirection, (2 * YDirection)] })]
          .filter((c: ICoordinates) =>
            // filter down to coordinates on the board
            Coordinates.IsCoordinatesWithin(c, board.range.min, board.range.max))
          .forEach(
            // add the coordinates to this piece's threatList
            (c: ICoordinates) => threatList.push(pieceActor.GetPositionByCoordinates(c, board).Id)
          );
      }
    }
    return threatList;
  }
  constructor(store: Store) {
    super(store);
  }
}
