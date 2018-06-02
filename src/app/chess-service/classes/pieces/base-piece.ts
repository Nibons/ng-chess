import { IBoard } from '@chess/iboard.model';
import { ICoordinates } from '@chess/icoordinates.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { IPiece } from '@chess/ipiece';
import { IPosition } from '@chess/iposition';
import { Coordinates } from '@chess/coordinates';
import { Observable, from } from 'rxjs';
import { ChessObject } from '@chess/chess-object';
import { IPlayer } from '@chess/iplayer.model';
import { IMove } from '@chess/imove.model';
import { Guid } from '@chess/guid';
import { IGame } from '@chess/igame';

export abstract class BasePiece extends ChessObject implements IPiece {
  public get owner(): IPlayer {
    return this.game.GetPlayerById(this.playerId);
  }
  public get board(): IBoard {
    return this.game.GetBoardById(this.boardId);
  }

  abstract readonly value: number;
  abstract pieceType: EPieceType;
  abstract GetThreatList(): IPosition[];

  static get value(): number { return this.value; }
  protected _IsAlive = true;
  public get IsAlive() { return this._IsAlive; }
  protected _HasMoved = false;

  public get HasMoved(): boolean { return this._HasMoved; }

  protected _PotentialMoves: IPosition[];
  public get potentialMoves(): IPosition[] { return this._PotentialMoves; }

  protected _ThreatList: IPosition[]; // which positions this piece is the threat
  public get threatList(): IPosition[] { return this._ThreatList; }

  protected _availableMoves: IMove[];
  public get availableMoves(): IMove[] { return this._availableMoves; }
  public get HasMoves(): boolean { return (this._availableMoves.length > 0) && (this._IsAlive); }

  constructor(
    public position: ICoordinates,
    readonly playerId: Guid,
    readonly boardId: Guid,
    public game: IGame) {
    super();
  }
  threat$: Observable<IPosition> = from(this._ThreatList);
  moves$: Observable<IMove> = from(this._availableMoves);

  static ProcessThreatInDirection(
    starting_position: IPosition,
    deltaX: number,
    deltaY: number,
    board: IBoard = starting_position.board,
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
