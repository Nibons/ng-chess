import { NgModule } from '@angular/core';
import { Bishop, Rook } from 'src/app/chess-service/classes/pieces';
import { AllChessPiecesService } from 'src/app/chess-service/services/allChessPieces.service';
import { ChessGameService } from 'src/app/chess-service/services/ChessGame.service';
import { StateProviderModule } from 'src/app/chess-service/state/state-provider.module';

@NgModule({
  imports: [
    StateProviderModule,
  ],
  providers: [
    ChessGameService,
    AllChessPiecesService,
    Bishop,
    Rook
  ]
})
export class ChessGameProviderModule { }
