import { IPiece } from '../interfaces/ipiece';
import { ETeam } from '../enums/eteam.enum';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Board } from './board';
import { Position } from './position';
import { IPosition } from '../interfaces/iposition';
import { Coordinates } from './coordinates';
import { Knight } from './knight';
import { Observable } from 'rxjs';

export abstract class BasePiece implements IPiece {
  constructor(public position: Position, public board: Board) { }
  abstract pieceType: EPieceType;
  protected _IsAlive = true;
  protected _HasMoved = false;
  protected _AvailableMoves: IPosition[];
  protected _ThreatList: IPosition[];
  protected _positionHere$: Observable<IPosition>;

  threat$: Observable<IPosition[]> = Observable.create(this._ThreatList);


  static ProcessThreatInDirection(
    starting_position: IPosition,
    deltaX: number,
    deltaY: number,
    board: Board,
    maxCount: number = board.xMax): IPosition[] {
    const position_cache: IPosition[] = new Array();
    let i = 1;
    for (let current_position = starting_position; current_position.IsOnBoard && current_position.IsEmpty && i <= maxCount; i++) {
      current_position = board.getPositionAt(new Coordinates((current_position.x + deltaX), (current_position.y + deltaY)));
      if (current_position.IsOnBoard) {
        position_cache.push(current_position);
      }
    }
    return position_cache;
  }

  move(target_position): void {
    // if _AvailableMoves -notContain target_position -> throw "Not a Valid Move"
    // this.position =
  }
  IsAlive(): boolean { return this._IsAlive; }
  protected setIsAlive(aliveStatus: boolean = false): void { this._IsAlive = aliveStatus; }

  HasMoved(): boolean { return this._HasMoved; }

  getAvailableMoves(): IPosition[] {
    return this._AvailableMoves;
  }
  HasMoves(): boolean {
    return this._AvailableMoves.length > 0;
  }
  getThreatList(): IPosition[] {
    return this._ThreatList;
  }

  protected subscribeToHerePosition(): void {
    return 1;
  }
  protected pushThreat(): void {
    let new_threat = this.GetThreatPositionList();
    this._ThreatList.filter(pos => !new_threat.includes(pos)).forEach(pos => this._ThreatList.)
  }


  abstract GetThreatPositionList(): IPosition[];
}
