import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameConsoleComponent } from 'src/app/components/GameConsole/GameConsole.component';
import { GameTabsComponent } from 'src/app/components/GameTabs/GameTabs.component';
import { NewGameComponent } from 'src/app/components/NewGame/NewGame.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatStepperModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { CoreModule } from 'src/app/core.module';

import { BoardComponent } from 'src/app/components/board/board.component';
import { PositionComponent } from 'src/app/components/board/position/position.component';
import { PieceComponent } from 'src/app/components/board/piece/piece.component';
import { StateProviderModule } from 'src/app/chess-service/state/state-provider.module';
import { ChessGameProviderModule } from 'src/app/chess-service/ChessGame.module';

@NgModule({
  declarations: [
    BoardComponent,
    PositionComponent,
    PieceComponent,

    AppComponent,
    GameConsoleComponent,
    GameTabsComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    StateProviderModule,
    ChessGameProviderModule,

    // Material + forms stuff
    MatTabsModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
