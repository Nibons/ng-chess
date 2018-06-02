import { ICoordinates } from '@chess/icoordinates.model';
import { IBoard } from '@chess/iboard.model';
import { IGame } from '@chess/igame';
import { Observable } from 'rxjs';
import { Board } from '@chess/board';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/iposition';
import { ChessObject } from '@chess/chess-object';
import { Guid } from '@chess/guid';
export class Position extends ChessObject implements IPosition {
  private _piece: IPiece = null;
  threaten_here: Observable<IPiece>; // pieces threatening this position
  get board(): IBoard {
    return this.game.GetBoardById(this.boardId);
  }
  get position(): IPosition {
    return this.board.GetPositionAt(this.coordinates);
  }

  public get IsOccupied(): boolean { return this.IsEmpty === false; }
  public get IsEmpty(): boolean { return this._piece === null; } // oposite of IsOccupied (i don't like double negatives anywhere)

  constructor(public coordinates: ICoordinates, public boardId: Guid, public game: IGame) {
    super();
  }
  SetPiece(piece: IPiece = null): void {
    this._piece = piece;
    if (piece !== null) {
      piece.position = this;
    }
  }
}

