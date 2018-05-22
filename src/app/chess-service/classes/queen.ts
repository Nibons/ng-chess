import { Rook } from './rook';
import { Bishop } from './bishop';
import { BasePiece } from './base-piece';
import { Position } from './position';
export class Queen extends BasePiece implements IPiece {

  static ProcessQueenThreat(initialPosition: IPosition, board: Board): Position[] {
    const position_cache: Position[] = new Array();
    Bishop.ProcessBishopThreat(initialPosition, board).forEach(pos => position_cache.push(pos));
    Rook.ProcessRookThreat(initialPosition, board).array.forEach(pos => position_cache.push(pos));
    return position_cache;
  }
  ProcessThreat(): void {
    Queen.ProcessQueenThreat(this.position, this.board);
  }
}
