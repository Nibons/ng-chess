import { Injectable, OnDestroy } from '@angular/core';
import { GamesaveStore } from './gamesave.store';
import { HttpClient } from '@angular/common/http';
import { Gamesave, createGamesave } from 'src/app/chess-service/state/gamesave/gamesave.model';
import { IGameTemplateLoader } from 'src/app/chess-service/interfaces/templates/game-template-loader.model';
import { mergeMap, map } from 'rxjs/operators';
import { from, Observable, Subscription, forkJoin } from 'rxjs';
import { IBoardTemplate } from 'src/app/chess-service/interfaces/templates/board-template.model';
import { IOptionsTemplate } from 'src/app/chess-service/interfaces/templates/options-template.model';
import { IPieceTemplate } from 'src/app/chess-service/interfaces/templates/piece-template.model';
import { IPlayerTemplate } from 'src/app/chess-service/interfaces/templates/player-template.model';
import { action, ID } from '@datorama/akita';

const templatesURI = '/assets/game_templates/GameTemplates.json';

@Injectable({ providedIn: 'root' })
export class GamesaveService implements OnDestroy {

  loadTemplatesSubscription: Subscription;

  constructor(
    private gamesaveStore: GamesaveStore,
    private http: HttpClient
  ) {

    // Subscribe to loaded defaults
    this.loadTemplatesSubscription = this.loadDefaultTemplates(templatesURI).subscribe({
      complete: () => {
        console.log('gameSave.Service[constructor] Template Loading Complete');
        this.gamesaveStore.setLoading(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.loadTemplatesSubscription.unsubscribe();
  }

  private loadDefaultTemplates(uri: string): Observable<any> {
    this.gamesaveStore.setLoading(true);
    return this.http.get<IGameTemplateLoader[]>(uri).pipe(
      mergeMap(gameTemplateLoaderList => from(gameTemplateLoaderList)),
      mergeMap(gameTemplateLoader => this.loadTemplate(gameTemplateLoader))
    );
  }

  private loadTemplate(gameTemplateLoader: IGameTemplateLoader): Observable<any> {
    const rootFolder = gameTemplateLoader.rootFolder;
    const configFiles = gameTemplateLoader.configFiles;

    const gameId = this.add(gameTemplateLoader);

    return forkJoin(
      this.loadBoards(gameId, rootFolder, configFiles.boards),
      this.loadOptions(gameId, rootFolder, configFiles.options),
      this.loadPieces(gameId, rootFolder, configFiles.pieces),
      this.loadPlayers(gameId, rootFolder, configFiles.players)
    );
  }

  private loadBoards(gameId: ID, root: string, url: string = ''): Observable<void> {
    return this.http.get<IBoardTemplate[]>(root + url).pipe(
      map(boardTemplate => this.updateBoards(boardTemplate, gameId))
    );
  }
  private loadOptions(gameId: ID, root: string, url: string = ''): Observable<void> {
    return this.http.get<IOptionsTemplate>(root + url).pipe(
      map(optionsTemplate => this.updateOptions(optionsTemplate, gameId))
    );
  }
  private loadPieces(gameId: ID, root: string, url: string = ''): Observable<void> {
    return this.http.get<IPieceTemplate>(root + url).pipe(
      map(pieceTemplate => this.updatePieces(pieceTemplate, gameId))
    );
  }
  private loadPlayers(gameId: ID, root: string, url: string = ''): Observable<void> {
    return this.http.get<IPlayerTemplate[]>(root + url).pipe(
      map(playerTemplate => this.updatePlayers(playerTemplate, gameId))
    );
  }

  @action({ type: 'Add BoardList' })
  private updateBoards(boardTemplateList: IBoardTemplate[], saveId: ID): void {
    this.update({ boards: boardTemplateList }, saveId);
  }
  @action({ type: 'Add GameOptions' })
  private updateOptions(optionsTemplate: IOptionsTemplate, saveId: ID): void {
    this.update({ options: optionsTemplate }, saveId);
  }
  @action({ type: 'Add PieceList' })
  private updatePieces(pieceTemplate: IPieceTemplate, saveId: ID): void {
    this.update({ pieces: pieceTemplate }, saveId);
  }
  @action({ type: 'Add Players' })
  private updatePlayers(playerTemplateList: IPlayerTemplate[], saveId: ID): void {
    this.update({ players: playerTemplateList }, saveId);
  }


  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
    // this.gamesaveStore.set(entities);
    // });
  }

  @action({ type: 'Add Game Save' })
  add(partialGameSave: Partial<Gamesave>): ID {
    const gameSave = createGamesave(partialGameSave);
    this.gamesaveStore.add(gameSave);
    return gameSave.id;
  }

  update(partialGameSave: Partial<Gamesave>, gameSaveId: ID) {
    this.gamesaveStore.update(gameSaveId, partialGameSave);
  }

}


