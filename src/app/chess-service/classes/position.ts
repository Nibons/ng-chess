import { Observable } from 'rxjs';
import { Board } from '@chess/board';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { ChessObject } from '@chess/chess-object';
export class Position extends ChessObject implements IPosition {
  private _piece: IPiece = null;

  public get IsOccupied(): boolean { return this.IsEmpty === false; }
  public get IsEmpty(): boolean { return this._piece === null; } // oposite of IsOccupied (i don't like double negatives anywhere)

  threaten_here: Observable<IPiece>; // pieces threatening this position
  constructor(readonly x: number, readonly y: number, public board: Board, _piece?: IPiece) {
    super();
  }

  static difference(position: IPosition, otherPosition: IPosition): IPosition {
    return new Coordinates([(otherPosition.x - position.x), (otherPosition.x - position.y)]);
  }
  static IsSamePosition(position: IPosition, otherPosition: IPosition): boolean {
    return otherPosition.x === position.x && otherPosition.y === position.y && position.board === otherPosition.board;
  }
  difference(position: IPosition, otherPosition: IPosition = this, board: Board = this.board): IPosition {
    return Position.difference(position, otherPosition);
  }
  IsSamePosition(position: IPosition, otherPosition: IPosition = this): boolean { return Position.IsSamePosition(position, otherPosition); }
  SetPiece(piece: IPiece = null): void {
    this._piece = piece;
    if (piece !== null) {
      piece.position = this;
    }
  }
}

