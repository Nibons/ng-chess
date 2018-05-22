import { BasePiece } from './base-piece';
import { IPiece } from '../interfaces/ipiece';
import { Team } from './team';
import { Position } from './position';
import { EPieceType } from '../enums/e-piece-type.enum';

export class Knight extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.knight;
  IsAlive() { return this._IsAlive; }

  private ProcessKnightThreat() {
    const directions = [1, -1];
    for (const XDirection of directions) {
      for (const YDirection of directions) {
        this.testThisPlaceForThreat((2 * XDirection), YDirection);
        this.testThisPlaceForThreat(XDirection, (2 * YDirection));
      }
    }
  }

}
