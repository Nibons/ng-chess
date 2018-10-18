import { Injectable, Inject, forwardRef } from '@angular/core';
import { GameStore } from './game.store';
import { Game } from 'src/app/chess-service/state/game/game.model';
import { BoardService } from 'src/app/chess-service/state/board/board.service';

import { GameQuery } from 'src/app/chess-service/state/game/game.query';
import { PieceService } from 'src/app/chess-service/state/piece/piece.service';
import { createBoard } from 'src/app/chess-service/state/board/board.model';
import { Gamesave } from 'src/app/chess-service/state/gamesave';

@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(
    private gameStore: GameStore,
    private gameQuery: GameQuery,
    @Inject(forwardRef(() => BoardService)) private boardService: BoardService,
    @Inject(forwardRef(() => PieceService)) private pieceService: PieceService
  ) { }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
    // this.gameStore.set(entities);
    // });
  }

  add(game: Game) {
    // adds the game to the game service
    this.gameStore.add(game);
    game.template.boards.forEach(
      boardTemplate =>
        this.boardService.add(createBoard(boardTemplate, game.id))
    );
    this.pieceService.populatePieces(game.id);
  }

  createFromSave(gameTemplate: Gamesave): ID {

  }
}
