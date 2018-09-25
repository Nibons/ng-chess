import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Piece } from 'src/app/chess-service/state/piece';

@Injectable({ providedIn: 'root' })
export class GameService {

  processPieceList: Subject<Piece> = Observable.create();

  constructor() { }

  public publishToPieceList(piece: Piece): void {
    this.processPieceList.next(piece);
  }
}
