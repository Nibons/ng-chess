import { IPiece } from '../interfaces/ipiece';
import { ETeam } from '../enums/eteam.enum';
import { EPieceType } from '../enums/e-piece-type.enum';
import { Board } from './board';
import { Position } from './position';
import { IPosition } from '../interfaces/iposition';
import {Coordinates} from './coordinates';

export abstract class BasePiece {
  constructor(public position: Position, pieceType: EPieceType, public board: Board) { }
  abstract pieceType: EPieceType;
  protected _IsAlive = true;
  protected _HasMoved = false;
  protected _AvailableMoves: Position[];
  protected _ThreatList: Position[];

  static ProcessThreatInDirection(startingPosition: IPosition, deltaX: number, deltaY: number, board:Board, maxCount?:number): IPosition[] {
    let position_cache: IPosition[] = new Array();
    let current_position: IPosition = startingPosition;
    let continue_this_direction = true;
    do{
      current_position = new Coordinates((current_position.x + deltaX), (current_position.y + deltaY));

    }while()
  }

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


}
