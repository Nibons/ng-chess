import { BasePiece } from './base-piece';
import { IPiece } from '../interfaces/ipiece';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Board } from './board';
import { Coordinates } from './coordinates';
import { Position } from './position';
import { IPosition } from '../interfaces/iposition';

export class Bishop extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.bishop;
  static ProcessBishopThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    BasePiece.ProcessThreatInDirection(initialPosition, 1, 1, board).forEach(pos => position_cache.push(pos)); // NE
    BasePiece.ProcessThreatInDirection(initialPosition, 1, -1, board).forEach(pos => position_cache.push(pos)); // SE
    BasePiece.ProcessThreatInDirection(initialPosition, -1, 1, board).forEach(pos => position_cache.push(pos)); // NW
    BasePiece.ProcessThreatInDirection(initialPosition, -1, -1, board).forEach(pos => position_cache.push(pos)); // SW
    return position_cache;
  }

  GetThreatPositionList(): IPosition[] { return Bishop.ProcessBishopThreat(this.position, this.board); }
}


