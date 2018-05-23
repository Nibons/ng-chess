import { BasePiece } from "./base-piece";
import { IPiece } from "../interfaces/ipiece";
import { IPosition } from '../interfaces/iposition';
import { Board } from './board';
import { EPieceType } from "../enums/e-piece-type.enum";

export class King extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.king;

  static ProcessKingThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) { break; } // not current position
        BasePiece.ProcessThreatInDirection(initialPosition, x, y, board, 1).forEach(pos => position_cache.push(pos));
      }
    }
    return position_cache;
  }
  GetThreatPositionList(initialPosition: IPosition = this.position, board: Board = this.board): IPosition[] { return King.ProcessKingThreat(initialPosition, board); }
}
