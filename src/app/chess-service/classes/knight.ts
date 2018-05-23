import { BasePiece } from './base-piece';
import { Board } from './board';
import { Coordinates } from './coordinates';
import { IPiece } from '../interfaces/ipiece';
import { IPosition } from '../interfaces/iposition';
import { Position } from './position';
import { EPieceType } from '../enums/e-piece-type.enum';

export class Knight extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.knight;


  static ProcessKnightThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    const directions = [1, -1];
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        [board.getPositionAt(new Coordinates((2 * XDirection), YDirection)), // 2n-Right, 1n-Up (for first iteration of directions)
        board.getPositionAt(new Coordinates(XDirection, (2 * YDirection)))] // 1n-Right, 2n-UP (for first iteration of directions)
          .filter((pos: IPosition) => pos.IsOnBoard).forEach(pos => position_cache.push(pos));
      }
    }
    return position_cache;
  }
  IsAlive() { return this._IsAlive; }
  GetThreatPositionList(): IPosition[] { return Knight.ProcessKnightThreat(this.position, this.board); }
}
