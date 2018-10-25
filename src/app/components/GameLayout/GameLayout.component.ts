import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { mergeMap, map, tap, distinctUntilChanged, withLatestFrom, filter, switchMap, single } from 'rxjs/operators';
import { Observable, Subject, Subscription, merge, interval, of } from 'rxjs';
import { Game, GameQuery } from 'src/app/chess-service/state/game';
import { Board } from 'src/app/chess-service/state/board/board.model';
import { BoardQuery } from 'src/app/chess-service/state/board';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gamelayout',
  templateUrl: './GameLayout.component.html',
  styleUrls: ['./GameLayout.component.css']
})
export class GameLayoutComponent implements OnInit, OnDestroy {
  _gameId$: Observable<ID> = this.route.paramMap.pipe(
    mergeMap(params => params.get('gameId') as string),
    map(s => Number(s)),
  );

  game$ = this._gameId$.pipe(
    mergeMap(id => this.gameQuery.selectEntity(id)),
    tap(game => this.setTitle(game.name))
  );
  boardList$ = this._gameId$.pipe(
    mergeMap(id => this.boardQuery.selectBoardsInGame(id))
  );


  constructor(
    private route: ActivatedRoute,
    private gameQuery: GameQuery,
    private boardQuery: BoardQuery,
    private titleService: Title
  ) { }

  ngOnInit() { }
  ngOnDestroy() { }

  private setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  // private setBoards(gameId: ID): void {
  //   this.boards = this.boardQuery.getAll().filter(
  //     board => board.gameId === gameId
  //   );
  // }

  // private setGame(gameId: ID): void {
  //   const game = this.gameQuery.getEntity(gameId);
  //   this.gameName = game.name;
  // }

}
