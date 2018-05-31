import { BasePiece } from '@chess/base-piece';
import { IPiece } from '@chess/ipiece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Coordinates } from '@chess/coordinates';
import { Position } from '@chess/position';
import { IPosition } from '@chess/iposition';

export class Bishop extends BasePiece implements IPiece {
  readonly value = 3;
  readonly pieceType = EPieceType.bishop;
  static ProcessBishopThreat(initialPosition: IPosition): IPosition[] {
    const position_cache: IPosition[] = new Array();
    this.ProcessThreatInDirection(initialPosition, 1, 1).forEach(pos => position_cache.push(pos)); // NE
    this.ProcessThreatInDirection(initialPosition, 1, -1).forEach(pos => position_cache.push(pos)); // SE
    this.ProcessThreatInDirection(initialPosition, -1, 1).forEach(pos => position_cache.push(pos)); // NW
    this.ProcessThreatInDirection(initialPosition, -1, -1).forEach(pos => position_cache.push(pos)); // SW
    return position_cache;
  }

  GetThreatList(): IPosition[] { return Bishop.ProcessBishopThreat(this.position); }
}


