import { Observable, Subject } from 'rxjs';
import { IPiece } from 'src/app/chess-service/interfaces/ipiece.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {

  processPieceList: Subject<IPiece> = Observable.create();

  constructor() { }

  public publishToPieceList(piece: IPiece): void {
    this.processPieceList.next(piece);
  }
}
