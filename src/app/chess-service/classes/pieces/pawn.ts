import { BasePiece } from '@chess/base-piece';
import { Board } from '@chess/board';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/iposition';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePlayer } from '@chess/base-player';

export class Pawn extends BasePiece implements IPiece {
  readonly pieceType = EPieceType.pawn;
  static ProcessPawnThreat(initialPosition: IPosition, board: Board): IPosition[] {
    const position_cache: IPosition[] = new Array();
    BasePiece.ProcessThreatInDirection(initialPosition, -1, 1, board, 1).forEach(pos => position_cache.push(pos)); // NorthWest
    BasePiece.ProcessThreatInDirection(initialPosition, 1, 1, board, 1).forEach(pos => position_cache.push(pos)); // NorthEast
    return position_cache;
  }
  GetThreatList(): IPosition[] {
    return Pawn.ProcessPawnThreat(this.position, this.board);
  }
  SetPotentialMoves(): void {
    const maxSteps = this.hasMoved ? 2 : 1;
    this._PotentialMoves = BasePiece.ProcessThreatInDirection(
      this.position, this.player.orientation.x, this.player.orientation.y, this.board, maxSteps);
  }
}
