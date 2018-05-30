import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PieceComponent } from './components/piece/piece.component';
import { PositionComponent } from './components/position/position.component';
import { BoardComponent } from './components/board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PieceComponent,
    PositionComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
