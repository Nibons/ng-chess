import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { GameStore, GameState } from './game.store';
import { Game } from './game.model';
import { Observable, from } from 'rxjs';
import { filter, mergeMap, distinctUntilChanged, buffer, map, withLatestFrom, concatMap } from 'rxjs/operators';
import { IPieceTemplate } from 'src/app/chess-service/interfaces/templates/piece-template.model';
import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { IBoardTemplate } from 'src/app/chess-service/interfaces/templates/board-template.model';
import { mergePieceListAndDefault } from 'src/app/chess-service/state/piece';

@Injectable({ providedIn: 'root' })
export class GameQuery extends QueryEntity<GameState, Game> {

  constructor(protected store: GameStore) {
    super(store);
  }

  getById(id: ID | null): Observable<Game> {
    return this.selectAll().pipe(
      mergeMap(list => from(list)),
      filter(game => game.id === id || id === null)
    );
  }

  selectByObservableId(gameId: Observable<ID>): Observable<Game> {
    return gameId.pipe(
      mergeMap(id => this.selectEntity(id))
    );
  }

  private storeLoaded(): Observable<boolean> {
    return this.selectLoading().pipe(
      filter(b => b),
      distinctUntilChanged()
    );
  }

  onLoaded(id: ID | null): Observable<Game> {
    // return this.getById(id).pipe(
    //   buffer(this.storeLoaded()),
    //   mergeMap(list => from(list))
    // );
    return this.storeLoaded().pipe(
      distinctUntilChanged(),
      filter(b => b === true),
      mergeMap(() => this.getById(id))
    );
  }

  selectBoardTemplate(gameId: ID): Observable<IBoardTemplate> {
    return this.selectEntity(gameId).pipe(
      map(game => game.template.boards),
      mergeMap(list => from(list))
    );
  }

  private selectPieceTemplate(gameId: ID): Observable<IPieceTemplate> {
    return this.selectEntity(gameId).pipe(
      map(game => game.template.pieces)
    );
  }
  private selectPieceDefaults(gameId: ID): Observable<Partial<IPieceData>> {
    return this.selectPieceTemplate(gameId).pipe(
      map(template => template.pieceDefaults)
    );
  }
  private selectPieceList(gameId: ID): Observable<Partial<IPieceData>[]> {
    return this.selectPieceTemplate(gameId).pipe(
      map(template => template.pieces)
    );
  }
  selectPieceCountFromTemplate(gameId: ID): Observable<number> {
    return this.selectPieceTemplate(gameId).pipe(
      map(
        template => template.pieces.length
      )
    );
  }
  selectPieceListAndDefaultsFromTemplate(gameId: ID):
    Observable<{ pieceList: Partial<IPieceData>[], defaults: Partial<IPieceData> }> {
    return this.selectPieceList(gameId).pipe(
      withLatestFrom(this.selectPieceDefaults(gameId)),
      map(([list, defaults]) => {
        return {
          pieceList: list,
          defaults: defaults
        };
      })
    );
  }

  doesGameExist(gameId: ID): boolean {
    return this.getEntity(gameId).id !== null;
  }
}
