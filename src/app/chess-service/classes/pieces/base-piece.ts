import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece';
import { Board } from '@chess/board';
import { Position } from '@chess/position';
import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { Observable, from } from 'rxjs';
import { ChessObject } from '@chess/chess-object';
import { IPlayer } from '@chess/iplayer.model';
import { BasePlayer } from '@chess/base-player';
import { IMove } from '@chess/imove.model';
import { Guid } from '@chess/guid';
import { Game } from '@chess/game';
import { IGame } from '@chess/igame';

export abstract class BasePiece extends ChessObject implements IPiece {
  get player(): IPlayer {
    return this.game.GetPlayerById(this.playerId);
  }

  abstract readonly value: number;
  abstract pieceType: EPieceType;
  abstract GetThreatList(): IPosition[];

  static get value(): number { return this.value; }
  _AvailableMoves: IMove[];
  protected _IsAlive = true;
  protected _HasMoved = false;
  protected _PotentialMoves: IPosition[];
  protected _ThreatList: IPosition[]; // which positions this piece is the threat
  protected _availableMoves: IMove[];
  constructor(
    public position: IPosition,
    readonly playerId: Guid,
    readonly boardId: Guid,
    public game: IGame) {
    super();
  }
  public get threatList(): IPosition[] { return this._ThreatList; }
  public get potentialMoves(): IPosition[] { return this._PotentialMoves; }
  public get availableMoves(): IMove[] { return this._availableMoves; }
  public get hasMoved(): boolean { return this._HasMoved; }
  public get isAlive(): boolean { return this._IsAlive; }
  threat$: Observable<IPosition> = from(this._ThreatList);
  moves$: Observable<IMove> = from(this._availableMoves);

  static ProcessThreatInDirection(
    starting_position: IPosition,
    deltaX: number,
    deltaY: number,
    board: Board = starting_position.board,
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
  protected setIsAlive(aliveStatus: boolean = false): void { this._IsAlive = aliveStatus; }

  HasMoves(): boolean {
    return this._AvailableMoves.length > 0 && this.isAlive;
  }
  SetThreat(positions: IPosition[] = this.GetThreatList()): void {
    this._ThreatList = positions;
  }

  SetPotentialMoves(): void {
    // override for pawns, rooks(for castling), kings (for castling)
    this._PotentialMoves = this._ThreatList.filter(
      position => position.IsEmpty || position.piece.playerNumber === this.playerNumber || this.board.friendlyFire
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
