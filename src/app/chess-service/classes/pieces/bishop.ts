import { BasePiece } from '@chess/base-piece';
import { IPiece } from '@chess//ipiece';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Board } from '@chess/board';
import { Coordinates } from '@chess/coordinates';
import { Position } from '@chess/position';
import { IPosition } from '@chess/iposition';

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

  GetThreatList(): IPosition[] { return Bishop.ProcessBishopThreat(this.position, this.board); }
}


