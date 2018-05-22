import { IPiece } from '../interfaces/ipiece';
import { ETeam } from '../enums/eteam.enum';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Board } from './board';
import { Position } from './position';

export abstract class BasePiece {
  constructor(public position: Position, pieceType: EPieceType, public board: Board) { }
  abstract pieceType: EPieceType;
  protected _IsAlive = true;
  protected _HasMoved = false;
  protected _AvailableMoves: Position[];
  protected _ThreatList: Position[];
  move(target_position): void {
    // if _AvailableMoves -notContain target_position -> throw "Not a Valid Move"
    // this.position =
  }
  IsAlive(): boolean { return this._IsAlive; }
  protected setIsAlive(aliveStatus: boolean = false): void { this._IsAlive = aliveStatus; }


  HasMoved(): boolean { return this._HasMoved; }


  getAvailableMoves(): Position[] {
    return this._AvailableMoves;
  }
  HasMoves(): boolean {
    return this._AvailableMoves.length > 0;
  }
  getThreatList(): Position[] {
    return this._ThreatList;
  }
  protected testThisPlaceForThreat(XVal: number, YVal: number): void {
    const potentialPosition = new Position(XVal, YVal);
    if (this.board.IsValidPosition(potentialPosition)) {
      this.
    }
  }
}
