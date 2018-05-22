import { BasePiece } from './base-piece';
import { IPiece } from '../interfaces/ipiece';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Board } from './board';
import { Coordinates } from './coordinates';
import { Position } from './position';
import { IPosition } from '../interfaces/iposition';

export class Bishop extends BasePiece implements IPiece {
  pieceType = EPieceType.bishop;
  static ProcessBishopThreat(initialPosition: IPosition, board: Board): Position[] {
    const direction = [1, -1];
    const position_cache: Position[] = new Array();
    for (const xDir of direction) {
      for (const yDir of direction) {
        let continue_this_direction = true;
        for (let i = 1; continue_this_direction; i++) {
          const pos = board.getPositionAt(new Coordinates(((xDir * i) + initialPosition.x), ((yDir * i) + initialPosition.y)));
          if (pos) {
            position_cache.push(pos);
            if (pos.IsOccupied) { continue_this_direction = false; }
          } else { continue_this_direction = false; }
        }
      }
    }
    return position_cache;
  }

  private ProcessBishopThreat(): void {
    const threatLocations = Bishop.ProcessBishopThreat(this.position, this.board);
  }
}


