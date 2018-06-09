import { GameStateModel } from '@chess/igame.model';
import { IPosition } from '@chess/IPosition.model';
import { IPlayer } from '@chess/iplayer.model';
import { IBoard } from '@chess/iboard.model';
import { IGame } from '@chess/igame.model';
import { Guid } from '@chess/guid';
import { Store } from '@ngxs/store';
import { IPiece } from '@chess/ipiece.model';
export class Game implements IGame {
  public Id: Guid;
  public IdCounter = 0;
  public colorList = ['white', 'black'];
  constructor({ Id, IdCounter }: GameStateModel, public store: Store) {
    this.Id = Id;
    this.IdCounter = IdCounter;
  }
  GetPlayerById(playerId: number): IPlayer {
    throw new Error('Method not implemented.');
  }
  GetBoardById(boardId: number): IBoard {
    throw new Error('Method not implemented.');
  }
  GetPositionById(positionId: number): IPosition {
    throw new Error('Method not implemented.');
  }
  GetPieceById(pieceId: number): IPiece {
    throw new Error('Method not implemented.');
  }
}
