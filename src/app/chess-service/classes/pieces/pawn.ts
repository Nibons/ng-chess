import { BasePiece } from '@chess/base-piece';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/iposition';
import { EPieceType } from '@chess/e-piece-type.enum';
import { BasePlayer } from '@chess/base-player';
import { Player } from '@chess/team';

export class Pawn extends BasePiece implements IPiece {
  readonly value = 1;
  readonly pieceType = EPieceType.pawn;
  static ProcessPawnThreat(initialPosition: IPosition): IPosition[] {
    const position_cache: IPosition[] = new Array();
    BasePiece.ProcessThreatInDirection(initialPosition, -1, 1, initialPosition.board, 1).forEach(pos => position_cache.push(pos)); // NorthWest
    BasePiece.ProcessThreatInDirection(initialPosition, 1, 1, initialPosition.board, 1).forEach(pos => position_cache.push(pos)); // NorthEast
    return position_cache;
  }
  GetThreatList(): IPosition[] {
    return Pawn.ProcessPawnThreat(this.position);
  }
  SetPotentialMoves(): void {
    const maxSteps = this.hasMoved ? 2 : 1;
    const direction = this.position.board.direction[this.playerNumber];

    this._PotentialMoves = BasePiece.ProcessThreatInDirection(
      this.position, direction.x, direction.y, this.board, maxSteps);
  }
}
