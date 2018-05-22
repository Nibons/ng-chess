import { BasePiece } from './base-piece';
import { IPiece } from '../interfaces/ipiece';
import { Position } from './position';
import { Board } from './board';
import { IPosition } from '../interfaces/iposition';
import { Coordinates } from './coordinates';
import { EPieceType } from '../enums/e-piece-type.enum';

export class Rook extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.rook;
  static ProcessRookThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    BasePiece.ProcessThreatInDirection(initialPosition, 1, 0, board).forEach(pos => position_cache.push(pos)); // East
    BasePiece.ProcessThreatInDirection(initialPosition, -1, 0, board).forEach(pos => position_cache.push(pos)); // West
    BasePiece.ProcessThreatInDirection(initialPosition, 0, 1, board).forEach(pos => position_cache.push(pos)); // North
    BasePiece.ProcessThreatInDirection(initialPosition, 0, -1, board).forEach(pos => position_cache.push(pos)); // South
    return position_cache;
  }
  private GetThreatPositionList() {
    return Rook.ProcessRookThreat(this.position, this.board);
  }

}
