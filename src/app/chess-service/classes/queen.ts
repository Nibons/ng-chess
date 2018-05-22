import { Rook } from './rook';
import { Bishop } from './bishop';
import { BasePiece } from './base-piece';
import { Position } from './position';
import {IPosition} from '../interfaces/iposition';
import {Board} from './board';
import { EPieceType } from '../enums/e-piece-type.enum';
import {IPiece} from '../interfaces/ipiece';

export class Queen extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.queen;

  static ProcessQueenThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    Bishop.ProcessBishopThreat(initialPosition, board).forEach(pos => position_cache.push(pos));
    Rook.ProcessRookThreat(initialPosition, board).forEach(pos => position_cache.push(pos));
    return position_cache;
  }
  ProcessThreat(): void {
    Queen.ProcessQueenThreat(this.position, this.board);
  }
}
