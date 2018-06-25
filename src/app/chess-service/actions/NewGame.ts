import { PieceStateModelList } from '@chess/ipiece.model';
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
        this.addpieces(configTemplate.pieces, this.Id);
      }
    );
  }

  private addBoards(boards: BoardStateModel[]) {
    const boardCreationTaskList = [];
    boards.forEach(
      (board: BoardStateModel) => boardCreationTaskList.push(this.store.dispatch(new CreateBoard(board, this.Id, this.store)))
    );
    return forkJoin(...boardCreationTaskList);
  }

  private addpieces(pieceStateModelList: PieceStateModelList, gameId: Guid) {
    const pieceCreationTaskList = [];
    console.log('number of pieces: ' + pieceStateModelList.pieces.length);
    pieceStateModelList.pieces.forEach(
      (piece: PieceStateModel) => {
        if (piece.pieceType !== undefined) {
          pieceCreationTaskList.push(this.store.dispatch(new CreatePiece(piece, gameId, this.store)));
        }
      }
    );
  }
}
