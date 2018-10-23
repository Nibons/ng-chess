import { Board, createBoard } from './board.model';
import { Injectable } from '@angular/core';
import { BoardStore } from './board.store';
import { GameQuery } from 'src/app/chess-service/state/game/game.query';
import { ID } from '@datorama/akita';
import { PositionService } from 'src/app/chess-service/state/position/position.service';

@Injectable({ providedIn: 'root' })
export class BoardService {

  constructor(
    private boardStore: BoardStore,
    private gameQuery: GameQuery,
    private positionService: PositionService) { }

  createBoardsFromGame(gameId: ID): void {
    this.boardStore.setLoading(true);
    const boardList = this.gameQuery.getEntity(gameId).template.boards;
    boardList.forEach(
      boardTemplate => {
        const board = createBoard(boardTemplate, gameId);
        this.add(board);
      }
    );
    this.boardStore.setLoading(false);
  }


  private add(board: Board) {
    this.boardStore.add(board);
    this.positionService.populatePositionsFromBoard(board.id);
  }
}
