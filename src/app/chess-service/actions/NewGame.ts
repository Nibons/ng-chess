import { SetGame } from '@chess/SetGame';
import { PieceStateModelList } from '@chess/ipiece.model';
import { BoardStateModelList } from '@chess/iboard.model';
import { GameState } from '@chess/game-state';
import { forkJoin } from 'rxjs';
import { CreatePiece } from './CreatePiece';
import { PieceStateModel } from './../interfaces/ipiece.model';
import { BoardStateModel } from './../interfaces/iboard.model';
import { GameStateModel } from '@chess//GameState.model';
import { IGameTemplate } from '@chess/igame-template.model';
import { Guid } from '@chess/guid';
import { Store } from '@ngxs/store';
import { CreateBoard } from '@chess/CreateBoard';
import { BoardState } from '@chess/board-state';
import { filter } from 'rxjs/operators';

export class NewGame {
  static readonly type = '[Game] CreateGame';
  private Id: Guid;
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
    const configTemplate = template.configStateTemplates;
    this.Id = Guid.newGuid();
    const addBoards$ = this.addBoards(configTemplate.boards);
    addBoards$.subscribe(
      () => {
        this.addpieces(configTemplate.pieces).subscribe(
          () => {
            this.store.dispatch(new SetGame(this.gameInfo));
          }
        );
      }
    );
  }

  private addBoards(boards: BoardStateModel[]) {
    const boardCreationTaskList = [];
    boards.forEach(
      (board: BoardStateModel) => boardCreationTaskList.push(this.store.dispatch(new CreateBoard(board, this.store)))
    );
    return forkJoin(...boardCreationTaskList);
  }

  private addpieces(pieceStateModelList: PieceStateModel[]) {
    const pieceCreationTaskList = [];
    pieceStateModelList.forEach(
      (piece: PieceStateModel) => {
        piece.gameId = this.Id;
        piece.Id = null;
        pieceCreationTaskList.push(this.store.dispatch(new CreatePiece(piece, this.Id, this.store)));
      }
    );
    return forkJoin(...pieceCreationTaskList);
  }
}
