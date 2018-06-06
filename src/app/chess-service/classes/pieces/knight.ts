import { ICoordinates } from '@chess/icoordinates.model';
import { Piece } from '@chess/piece';
import { Coordinates } from '@chess/coordinates';
import { IPiece } from '@chess/ipiece.model';
import { IPosition } from '@chess/iposition.model';
import { EPieceType } from '@chess/e-piece-type.enum';

export class Knight extends BasePiece implements IPiece {
  readonly value = 3;
  readonly pieceType = EPieceType.knight;


  static ProcessKnightThreat(initialPosition: IPosition): IPosition[] {
    const position_cache: IPosition[] = new Array();
    const directions = [1, -1];
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        [initialPosition.board.getPositionAt(new Coordinates([(2 * XDirection), YDirection])), // 2n-Right, 1n-Up (for first iteration of directions)
        initialPosition.board.getPositionAt(new Coordinates([XDirection, (2 * YDirection)]))] // 1n-Right, 2n-UP (for first iteration of directions)
          .filter((pos: IPosition) => pos.IsOnBoard).forEach(pos => position_cache.push(pos));
      }
    }
    return position_cache;
  }
  RefreshThreatList(): void {
    const position_cache: IPosition[] = new Array();
    const board = this.game.GetBoardById(this.game.GetPositionById(this.positionId).boardId);
    const directions = [1, -1];
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        [Coordinates.GetDelta(this.coordinates, { dimensions: [(2 * XDirection), YDirection] }),
        Coordinates.GetDelta(this.coordinates, { dimensions: [XDirection, (2 * YDirection)] })]
          .filter((c: ICoordinates) =>
            Coordinates.IsCoordinatesWithin(c, board.range.min, board.range.max));
      }
    }
  }
  GetThreatList(): IPosition[] { return Knight.ProcessKnightThreat(this.position); }
}
