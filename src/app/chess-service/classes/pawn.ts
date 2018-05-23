import { BasePiece } from './base-piece';
import { Board } from './board';
import { IPiece } from '../interfaces/ipiece';
import { IPosition } from '../interfaces/iposition';
import { EPieceType } from '../enums/e-piece-type.enum';

export class Pawn extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.pawn;
  static ProcessPawnThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    BasePiece.ProcessThreatInDirection(initialPosition, -1, 1, board, 1).forEach(pos => position_cache.push(pos)); // NorthWest
    BasePiece.ProcessThreatInDirection(initialPosition, 1, 1, board, 1).forEach(pos => position_cache.push(pos)); // NorthWest
    return position_cache;
  }
  GetThreatPositionList(): IPosition[] {
    return Pawn.ProcessPawnThreat(this.position, this.board);
  }
}
