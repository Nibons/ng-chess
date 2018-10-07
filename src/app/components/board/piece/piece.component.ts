import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ID } from '@datorama/akita';
import { Piece, PieceQuery } from 'src/app/chess-service/state/piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() pieceId$: Observable<ID> = of(0);

  piece$: Observable<Piece> = this.pieceQuery.getPieceById$(this.pieceId$);

  constructor(protected pieceQuery: PieceQuery) { }

  ngOnInit() {
  }

}
