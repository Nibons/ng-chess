import { PieceState } from '@chess/piece-state';
import { GameState } from '@chess/game-state';
import { BoardState } from '@chess/board-state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PieceComponent } from './components/piece/piece.component';
import { PositionComponent } from './components/position/position.component';
import { BoardComponent } from './components/board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './components/game/game.component';
import { NgxsModule } from '@ngxs/store';
import { PositionState } from '@chess/position-state';
import { PlayerState } from '@chess/player-state';
import { GameSelectComponent } from './components/game-select/game-select.component';
import { TemplateState } from '@chess/game-select-state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ChessService } from '@chess/chess-service';
import { SelectTemplateComponent } from './components/select-template/select-template.component';

@NgModule({
  declarations: [
    AppComponent,
    PieceComponent,
    PositionComponent,
    BoardComponent,
    GameComponent,
    GameSelectComponent,
    SelectTemplateComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    NgxsModule.forRoot([
      BoardState,
      GameState,
      PositionState,
      PieceState,
      PlayerState,
      TemplateState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [ChessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
