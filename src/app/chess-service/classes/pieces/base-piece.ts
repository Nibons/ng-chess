import { Bishop } from '@chess/bishop';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece';
import { ETeam } from '@chess/eteam.enum';
import { Board } from '@chess/board';
import { Position } from '@chess/position';
import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { Knight } from '@chess/knight';
import { Observable } from 'rxjs';
import { Rook } from '@chess/rook';
import { Pawn } from '@chess/pawn';
import { King } from '@chess/king';
import { Queen } from '@chess/queen';
import { ChessObject } from '@chess/chess-object';
import { CPiece } from '@chess/config/cpiece';
import { IPlayer } from '@chess/iplayer.model';
import { BasePlayer } from '@chess/base-player';
import { IMove } from '@chess/imove.model';

export abstract class BasePiece extends ChessObject implements IPiece {
  abstract readonly value: number;
  static get value(): number { return this.value; }
  _AvailableMoves: any;
  constructor(public position: IPosition, public player: IPlayer, public board?: Board) {
    super();
  }
  abstract pieceType: EPieceType;

  protected _IsAlive = true;
  protected _HasMoved = false;
  protected _PotentialMoves: IPosition[];
  protected _ThreatList: IPosition[]; // which positions this piece is the threat
  protected _availableMoves: IMove[];
  public get threatList(): IPosition[] { return this._ThreatList; }
  public get potentialMoves(): IPosition[] { return this._PotentialMoves; }
  public get availableMoves(): IMove[] { return this._availableMoves; }
  public get hasMoved(): boolean { return this._HasMoved; }
  public get isAlive(): boolean { return this._IsAlive; }


  threat$: Observable<IPosition[]> = Observable.create(this._ThreatList);
  static PieceFactory(PieceType: EPieceType, position: IPosition, player: IPlayer, board: Board): IPiece {
    if (position.IsOccupied) { position.piece.Kill(); }
    switch (PieceType) {
      case EPieceType.bishop: { return new Bishop(position, player, board); }
      case EPieceType.king: { return new King(position, player, board); }
      case EPieceType.knight: { return new Knight(position, player, board); }
      case EPieceType.pawn: { return new Pawn(position, player, board); }
      case EPieceType.queen: { return new Queen(position, player, board); }
      case EPieceType.rook: { return new Rook(position, player, board); }
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
    for (let current_position = starting_position;
      current_position.IsOnBoard && current_position.IsEmpty && i <= maxCount;
      i++
    ) {
      current_position = board.getPositionAt(new Coordinates([(current_position.x + deltaX), (current_position.y + deltaY)]));
      if (current_position.IsOnBoard) {
        position_cache.push(current_position);
      }
    }
    return position_cache;
  }

  Move(target_position): boolean { // false if this position is not a valid move
    if (this.IsWithinValidMoves(target_position)) {
      this._HasMoved = true;
      this.position.SetPiece(); // position the piece is coming from
      Board.getPositionAt(target_position, this.board).SetPiece(this); // where the piece is going
      this.position = target_position;
      return true;
    } else { return false; }
  }

  CopyToBoard(board: Board) {
    const newPiece = BasePiece.PieceFactory(this.pieceType, this.position, this.player, board);
    newPiece.SetThreat(this._ThreatList);
  }


  protected setIsAlive(aliveStatus: boolean = false): void { this._IsAlive = aliveStatus; }

  GetAvailableMoves(): IPosition[] {
    return this._AvailableMoves;
  }
  HasMoves(): boolean {
    return this._AvailableMoves.length > 0 && this.isAlive;
  }
  SetThreat(positions: IPosition[] = this.GetThreatList()): void {
    this._ThreatList = positions;
  }
  abstract GetThreatList(): IPosition[];
  SetPotentialMoves(): void {
    // override for pawns, rooks(for castling), kings (for castling)
    this._PotentialMoves = this._ThreatList.filter(
      position => position.IsEmpty || position.piece.player === this.player || this.board.friendlyFire
    );
  }
  Kill(): void {
    this._IsAlive = false;
    this.board.RemovePiece(this);
  }
  private IsWithinValidMoves(position: IPosition) {
    const ValidMovesThatMatchThis = this._availableMoves.filter(moves => Position.IsSamePosition(moves.position, position));
    return ValidMovesThatMatchThis.length >= 1;
  }

}
