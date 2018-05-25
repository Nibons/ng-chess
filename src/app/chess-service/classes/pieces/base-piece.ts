import { Bishop } from '@chess/bishop';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece';
import { ETeam } from '@chess//eteam.enum';
import { Board } from '@chess//board';
import { Position } from '@chess//position';
import { IPosition } from '@chess//iposition';
import { Coordinates } from '@chess//coordinates';
import { Knight } from '@chess//knight';
import { Observable } from 'rxjs';
import { Rook } from '@chess//rook';
import { Pawn } from '@chess//pawn';
import { King } from '@chess//king';
import { Queen } from '@chess//queen';
import { ChessObject } from '@chess/chess-object';

export abstract class BasePiece extends ChessObject implements IPiece {
  constructor(public position: Position, public board: Board) {
    super();
  }
  abstract pieceType: EPieceType;
  protected _IsAlive = true;
  protected _HasMoved = false;
  protected _AvailableMoves: IPosition[];
  protected _ThreatList: IPosition[];
  protected _positionHere$: Observable<IPosition>;

  threat$: Observable<IPosition[]> = Observable.create(this._ThreatList);

  static PieceFactory(PieceType: EPieceType, position: Position, board: Board): IPiece {
    switch (PieceType) {
      case EPieceType.bishop: { return new Bishop(position, board); }
      case EPieceType.king: { return new King(position, board); }
      case EPieceType.knight: { return new Knight(position, board); }
      case EPieceType.pawn: { return new Pawn(position, board); }
      case EPieceType.queen: { return new Queen(position, board); }
      case EPieceType.rook: { return new Rook(position, board); }
    }
  }

  static ProcessThreatInDirection(
    starting_position: IPosition,
    deltaX: number,
    deltaY: number,
    board: Board,
    maxCount: number = board.dimensions.max.x): IPosition[] {
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
    const new_threat = this.GetThreatPositionList();
    this._ThreatList.filter(pos => !new_threat.includes(pos)).forEach(pos => this._ThreatList.);
  }


  abstract GetThreatPositionList(): IPosition[];
}
