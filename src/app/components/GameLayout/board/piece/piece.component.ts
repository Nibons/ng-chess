import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ID } from '@datorama/akita';
import { Piece, PieceQuery } from 'src/app/chess-service/state/piece';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() pieceId: ID = 0;

  piece$: Observable<Piece> = this.pieceQuery.selectEntity(this.pieceId);

  constructor(protected pieceQuery: PieceQuery) { }

  ngOnInit() {
    console.log(this.pieceId);
    this.piece$ = this.pieceQuery.selectEntity(this.pieceId).pipe(delay(0));
  }

}
