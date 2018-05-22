import { BasePiece } from './base-piece';
import { IPiece } from '../interfaces/ipiece';
import { Position } from './position';
import { Board } from './board';
import { IPosition } from '../interfaces/iposition';
import { Coordinates } from './coordinates';

export class Rook extends BasePiece implements IPiece {
  static ProcessRookThreat(initialPosition: IPosition, board: Board) {
    let position_cache: Position[] = new Array();
    Rook.ProcessRookThreat(initialPosition, board).foreach(pos => position_cache)
  }
  static ProcessRookXThreat(initialPosition: IPosition, board: Board): Position[] {
    const position_cache: Position[] = new Array();
    const direction = [1, -1];
    for (const xDir of direction) {
      let continue_this_direction = true;
      for (const i = 1; continue_this_direction; i++) {
        const pos = board.getPositionAt(new Coordinates(((xDir * i) + initialPosition.x), initialPosition.y));
        if (pos) {
          position_cache.push(pos);
          if (pos.IsOccupied) { continue_this_direction = false; }
        } else { continue_this_direction = false; }
      }
    }
    return position_cache;
  }
  static ProcessRookYThreat(initialPosition: IPosition, board: Board): Position[] {
    const position_cache: Position[] = new Array();
    const direction = [1, -1];
    for (const yDir of direction) {
      let continue_this_direction = true;
      for (let i = 1; continue_this_direction; i++) {
        const pos = board.getPositionAt(new Coordinates(initialPosition.x, ((yDir * i) + initialPosition.y)));
        if (pos) {
          position_cache.push(pos);
          if (pos.IsOccupied) { continue_this_direction = false; }
        } else { continue_this_direction = false; }
      }
    }
    return position_cache;
  }
}
