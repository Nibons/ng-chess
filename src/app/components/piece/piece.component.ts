import { Component, OnInit, Input } from '@angular/core';
import { IPiece } from '@chess/IPiece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() piece: IPiece = null;
  player = this.piece.player;
  playerColor = this.player.color;
  moves = this.piece.availableMoves;
  direction = this.player.orientation; // 1 for white, -1 for black
  constructor(MatIconRegistry) { }
  ngOnInit() {
  }
}
