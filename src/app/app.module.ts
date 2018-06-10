import { PieceState } from './store/states/piece-state';
import { GameState } from '@chess/game-state';
import { BoardState } from './store/states/board-state';
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

@NgModule({
  declarations: [
    AppComponent,
    PieceComponent,
    PositionComponent,
    BoardComponent,
    GameComponent,
    GameSelectComponent
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
      PlayerState
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
