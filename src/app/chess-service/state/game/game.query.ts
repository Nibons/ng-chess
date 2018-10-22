import { Injectable } from '@angular/core';
import { QueryEntity, ID } from '@datorama/akita';
import { GameStore, GameState } from './game.store';
import { Game } from './game.model';
import { Observable, from } from 'rxjs';
import { filter, mergeMap, distinctUntilChanged, buffer, map, withLatestFrom, concatMap } from 'rxjs/operators';
import { IPieceTemplate } from 'src/app/chess-service/interfaces/templates/piece-template.model';
import { IPieceData } from 'src/app/chess-service/interfaces/ipiece-data.model';
import { Piece, createPiece } from 'src/app/chess-service/state/piece/piece.model';

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

  private storeLoaded(): Observable<boolean> {
    return this.selectLoading().pipe(
      filter(b => b),
      distinctUntilChanged()
    );
  }

  onLoaded(id: ID | null): Observable<Game> {
    return this.getById(id).pipe(
      buffer(this.storeLoaded()),
      mergeMap(list => from(list))
    );
  }

  private selectPieceTemplate(gameId: ID): Observable<IPieceTemplate> {
    return this.selectEntity(gameId).pipe(
      map(game => game.template.pieces)
    );
  }
  private selectPieceDefaultsFromTemplate(gameId: ID): Observable<Partial<IPieceData>> {
    return this.selectPieceTemplate(gameId).pipe(
      map(template => template.pieceDefaults)
    );
  }
  selectPieceCountFromTemplate(gameId: ID): Observable<number> {
    return this.selectPieceTemplate(gameId).pipe(
      map(
        template => template.pieces.length
      )
    );
  }
  selectPieceListFromTemplate(gameId: ID): Observable<IPieceData> {
    return this.selectPieceDefaultsFromTemplate(gameId).pipe(
      concatMap(
        () => this.selectPieceListFromTemplate(gameId),
        (template, piece) => {
          const combined: IPieceData = { ...template, ...piece };
          return combined;
        }
      )
    );
  }
}
