import { Coordinates } from '@chess/coordinates';
import { IBoard } from '@chess/iboard.model';
import { ICoordinates } from '@chess/icoordinates.model';
import { IPiece } from '@chess/ipiece.model';
import { EPieceType } from '@chess/e-piece-type.enum';
import { Guid } from '@chess/guid';
import { IPlayer } from '@chess/iplayer.model';
import { IPosition } from '@chess/iposition.model';
import { IGame } from '@chess/igame.model';
export abstract class Piece implements IPiece {
  Id: Guid;
  gameId: Guid;
  game: IGame;
  playerNumber: number;
  abstract pieceType: EPieceType;
  IsPrimary: boolean;
  value: number;
  playerId: Guid;
  positionId: Guid;
  threatList: Guid[];
  potentialMoves: Guid[];
  moves: IPosition[];
  IsAlive = true;
  HasMoved = false;
  get board(): IBoard {
    return this.game.GetBoardById(this.position.Id);
  }
  get coordinates(): ICoordinates { return this.game.GetPositionById(this.positionId).coordinates; }
  set coordinates(coordinates: ICoordinates) { this.positionId = this.board.GetPositionAt(coordinates).Id; }
  get position(): IPosition { return this.game.GetPositionById(this.positionId); }
  owner(): IPlayer { return this.game.GetPlayerById(this.playerId); }
  HasMoves(): boolean { return this.moves.length > 0; }
  GetThreatList(): IPosition[] {
    const position_cache = new Array();
    this.threatList.forEach(
      (positionId: Guid) =>
        position_cache.push(this.game.GetPositionById(positionId))
    );
    return position_cache;
  }
  abstract RefreshThreatList();

  RefreshPotentialMoveList() { // overridden in pawn(threat != move), rook(+castling), king(+castling)
    this.RefreshThreatList();
    this.potentialMoves = this.threatList;
  }
  static GetPositionsInDirectionUntilEmpty(piece: IPiece, direction: ICoordinates, count = Number.MAX_SAFE_INTEGER): Guid[] {
    const position_cache: Guid[] = [];
    const coordinates_in_direction = Coordinates.GetCoordinatesInDirection(
      piece.coordinates,
      direction,
      piece.board.range.min,
      piece.board.range.max,
      count
    );
    let continue_this_direction = true;
    for (let i = 0; continue_this_direction; i++) {
      const pos = piece.board.GetPositionAt(coordinates_in_direction[i]);
      position_cache.push(pos.Id);
      continue_this_direction = pos.IsEmpty;
    }
    return position_cache;
  }
  RefreshMoveList() {
    throw new Error('Method not implemented.');
  }
  Move(position: IPosition): boolean {
    throw new Error('Method not implemented.');
  }

  Kill(): void {
    throw new Error('Method not implemented.');
  }
}
