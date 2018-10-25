import { Injectable, Inject, forwardRef, OnDestroy } from '@angular/core';
import { GameStore } from './game.store';
import { Game, createGame } from 'src/app/chess-service/state/game/game.model';
import { BoardService } from 'src/app/chess-service/state/board/board.service';

import { PieceService } from 'src/app/chess-service/state/piece/piece.service';
import { Gamesave } from 'src/app/chess-service/state/gamesave';
import { ID } from '@datorama/akita';
import { Subject, Observable, Subscription } from 'rxjs';
import { last } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GameService implements OnDestroy {

  private _gameToCreate$: Subject<Gamesave> = new Subject<Gamesave>();
  createdGameId$: Subject<ID> = new Subject<ID>();
  private _gameCreationSubscription: Subscription;

  constructor(
    private gameStore: GameStore,
    @Inject(forwardRef(() => BoardService)) private boardService: BoardService,
    @Inject(forwardRef(() => PieceService)) private pieceService: PieceService
  ) {
    this._gameCreationSubscription = this._gameToCreate$.subscribe(
      gamesave => this.createGameFromGameSave(gamesave)
    );
  }

  ngOnDestroy() {
    this._gameCreationSubscription.unsubscribe();
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
    // this.gameStore.set(entities);
    // });
  }

  createFromGameSave(gameSave: Gamesave): void {
    this._gameToCreate$.next(gameSave);
  }

  private add(game: Game) {
    this.gameStore.add(game);
  }

  private createGameFromGameSave(gameSave: Gamesave): void {
    this.gameStore.setLoading(true);
    const newGame = createGame(gameSave);
    this.add(newGame);
    this.boardService.createBoardsFromGame(newGame.id);
    this.pieceService.populateAllPieces(newGame.id);
    this.gameStore.setLoading(false);
    this.createdGameId$.next(newGame.id);
  }
}
