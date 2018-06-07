import { GameStateModel } from './../interfaces/igame.model';
import { IPosition } from '@chess/IPosition.model';
import { IPlayer } from '@chess/iplayer.model';
import { IBoard } from '@chess/iboard.model';
import { IGame } from '@chess/igame.model';
import { Guid } from '@chess/guid';
export class Game implements IGame {
  public Id: Guid = Guid.newGuid();
  public IdCounter = 0;
  constructor({ public Id, public IdCounter }: GameStateModel) {
    this.Id = Id;
    this.IdCounter = IdCounter;
  }
  GetBoardById(boardId: number): IBoard { }
  GetPlayerById(playerId: number): IPlayer { }
  GetPositionById(positionId: number): IPosition { }
  GetPieceById(pieceId: number): IPiece { }
}
