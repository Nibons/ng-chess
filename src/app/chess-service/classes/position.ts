import { Board } from './board';
import { IPiece } from '../interfaces/ipiece';
import { IPosition } from '../interfaces/iposition';

export class Position implements IPosition {
  private _piece: IPiece = null;
  IsOccupied = false;

  constructor(readonly x: number, readonly y: number, board?: Board, _piece?: IPiece) { }

  static difference(position: Position, otherPosition: Position): Position {
    return new Position((otherPosition.x - position.x), (otherPosition.x - position.y));
  }
  static IsSamePosition(position: Position, otherPosition: Position): boolean {
    return otherPosition.x === position.x && otherPosition.y === position.y;
  }
  difference(position: Position, otherPosition: Position = this): Position { return Position.difference(position, otherPosition); }
  IsSamePosition(position: IPosition, otherPosition: IPosition = this): boolean { return Position.IsSamePosition(position, otherPosition); }


  private SetPiece(piece?: IPiece) {
    if (piece) { this._piece = piece; } else { this._piece = null; }
  }
}

