import { Injectable } from '@angular/core';
import { GamesaveStore } from './gamesave.store';
import { HttpClient } from '@angular/common/http';
import { Gamesave, createGamesave } from 'src/app/chess-service/state/gamesave/gamesave.model';
import { IGameTemplateLoader } from 'src/app/chess-service/interfaces/templates/game-template-loader.model';
import { mergeMap, combineLatest } from 'rxjs/operators';
import { from, Observable, Subscription } from 'rxjs';
import { IGameTemplate } from 'src/app/chess-service/interfaces/templates/game-template.model';
import { IBoardTemplate } from 'src/app/chess-service/interfaces/templates/board-template.model';
import { IOptionsTemplate } from 'src/app/chess-service/interfaces/templates/options-template.model';
import { IPieceTemplate } from 'src/app/chess-service/interfaces/templates/piece-template.model';
import { IPlayerTemplate } from 'src/app/chess-service/interfaces/templates/player-template.model';

const templatesURI = '/assets/game_templates/GameTemplates.json';

@Injectable({ providedIn: 'root' })
export class GamesaveService {
  loaderSubscription: Subscription;

  constructor(
    private gamesaveStore: GamesaveStore,
    private http: HttpClient
  ) {

    // Subscribe + unsubscribe to loaded defaults
    this.loaderSubscription = this.loadDefaultTemplates().subscribe(
      (gameTemplate: IGameTemplate) => { this.add(gameTemplate); },
      (err: Error) => { console.log(err); },
      () => { this.loaderSubscription.unsubscribe(); }
    );

  }

  private loadDefaultTemplates(): Observable<IGameTemplate> {
    return this.http.get<IGameTemplateLoader[]>(templatesURI).pipe(
      mergeMap(gameTemplateLoaderList => from(gameTemplateLoaderList)),
      mergeMap(gameTemplateLoader => this.loadTemplate(gameTemplateLoader))
    );
  }

  private loadTemplate(gameTemplateLoader: IGameTemplateLoader): Observable<IGameTemplate> {
    const rootFolder = gameTemplateLoader.rootFolder;
    const configFiles = gameTemplateLoader.configFiles;

    return Observable.create().pipe(
      combineLatest(
        this.loadBoards(rootFolder, configFiles.boards),
        this.loadOptions(rootFolder, configFiles.options),
        this.loadPlayers(rootFolder, configFiles.players),
        this.loadPieces(rootFolder, configFiles.pieces),
        (board, options, players, pieces) => {
          return {
            name: gameTemplateLoader.name,
            options: options,
            boards: board,
            players: players,
            pieces: pieces
          };
        }
      )
    );
  }

  private loadBoards(root: string, url: string = ''): Observable<IBoardTemplate[]> {
    return this.http.get<IBoardTemplate[]>(root + url);
  }

  private loadOptions(root: string, url: string = ''): Observable<IOptionsTemplate> {
    return this.http.get<IOptionsTemplate>(root + url);
  }

  private loadPieces(root: string, url: string = ''): Observable<IPieceTemplate> {
    return this.http.get<IPieceTemplate>(root + url);
  }

  private loadPlayers(root: string, url: string = ''): Observable<IPlayerTemplate[]> {
    return this.http.get<IPlayerTemplate[]>(root + url);
  }


  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
    // this.gamesaveStore.set(entities);
    // });
  }

  add(partialGameSave: Partial<Gamesave>) {
    const gameSave = createGamesave(partialGameSave);
    this.gamesaveStore.add(gameSave);
  }

}
