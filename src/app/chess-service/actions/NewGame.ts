import { forkJoin } from 'rxjs';
import { CreatePiece } from './CreatePiece';
import { PieceStateModel } from './../interfaces/ipiece.model';
import { BoardStateModel } from './../interfaces/iboard.model';
import { GameStateModel } from '@chess//GameState.model';
import { IGameTemplate } from '@chess/igame-template.model';
import { Guid } from '@chess/guid';
import { Store } from '@ngxs/store';
import { CreateBoard } from '@chess/CreateBoard';

export class NewGame {
  static readonly type = '[Game] CreateGame';
  private Id: Guid;
  public payload: GameStateModel;
  private boardCreationTaskList = [];
  private pieceCreationTaskList = [];

  public get gameInfo(): GameStateModel {
    return {
      name: this.template.name,
      Id: this.Id,
      options: this.template.configStateTemplates.options,
      boards: null,
      pieces: null,
      players: null,
      template: this.template
    };
  }
  constructor(private template: IGameTemplate, private store: Store) {
    this.Id = Guid.newGuid();
    this.payload = this.gameInfo;
    this.template.configStateTemplates.boards.boards.forEach(
      (board: BoardStateModel) => this.boardCreationTaskList.push(store.dispatch(new CreateBoard(board, store)))
    );
    forkJoin(...this.boardCreationTaskList).subscribe(
      () => { this.addpieces(); }
    );
  }

  private addpieces() {
    this.gameInfo.template.configStateTemplates.pieces.pieces.forEach(
      (piece: PieceStateModel) => {
        piece.gameId = this.Id;
        piece.Id = null;
        this.pieceCreationTaskList.push(this.store.dispatch(new CreatePiece(piece, this.Id, this.store)));
      }
    );
  }
}
