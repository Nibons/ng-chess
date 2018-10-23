import { Injectable, Inject, forwardRef } from '@angular/core';
import { GameStore } from './game.store';
import { Game, createGame } from 'src/app/chess-service/state/game/game.model';
import { BoardService } from 'src/app/chess-service/state/board/board.service';

import { PieceService } from 'src/app/chess-service/state/piece/piece.service';
import { Gamesave } from 'src/app/chess-service/state/gamesave';
import { ID } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(
    private gameStore: GameStore,
    @Inject(forwardRef(() => BoardService)) private boardService: BoardService,
    @Inject(forwardRef(() => PieceService)) private pieceService: PieceService
  ) { }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
    // this.gameStore.set(entities);
    // });
  }

  private add(game: Game) {
    this.gameStore.add(game);
  }

  createFromGameSave(gameSave: Gamesave): ID {
    this.gameStore.setLoading(true);
    const newGame = createGame(gameSave);
    this.add(newGame);
    this.boardService.createBoardsFromGame(newGame.id);
    this.pieceService.populateAllPieces(newGame.id);
    this.gameStore.setLoading(false);
    return newGame.id;
  }
}
