import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Piece } from 'src/app/chess-service/state/piece';
import { PieceStreamService } from 'src/app/chess-service/services/piece-stream.service';
import { AllChessPiecesService } from 'src/app/chess-service/services/allChessPieces.service';

@Injectable({ providedIn: 'root' })
export class GameService {

  processPieceList: Subject<Piece> = Observable.create();

  constructor() { }

  public publishToPieceList(piece: Piece): void {
    this.processPieceList.next(piece);
  }
}
