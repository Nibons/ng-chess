import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { Piece, PieceQuery } from 'src/app/chess-service/state/piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() pieceId: ID = 0;

  piece$: Observable<Piece> = new Observable<Piece>();

  constructor(protected pieceQuery: PieceQuery) { }

  ngOnInit() {
    this.piece$ = this.pieceQuery.selectEntity(this.pieceId);
  }

}
