import { AllChessPiecesService } from 'src/app/chess-service/services/allChessPieces.service';
import { PieceService, PieceQuery } from 'src/app/chess-service/state/piece';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChessGameService {
  constructor(
    private allChessPieces: AllChessPiecesService,
    private piecesService: PieceService,
    private piecesQuery: PieceQuery) {

  }

  onPiecesCreated() {
    this.subscribeToPiecesThreatList();
  }

  private subscribeToPiecesThreatList() {
    this.allChessPieces.SelectPiecesWithThreatList(this.piecesQuery.getAllPieces$())
      .subscribe(
        piece => this.piecesService.update(piece.id, piece)
      );
  }
}
