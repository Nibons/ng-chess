import { Component, OnInit, Input } from '@angular/core';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { IPiece } from '@chess/IPiece';
import { IPlayer } from '@chess/iplayer.model';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.importPieceIcon(iconRegistry, sanitizer);
  }

  private importPieceIcon(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    iconName: string = this.IconName
  ): void {
    iconRegistry.addSvgIcon(
      iconName,
      sanitizer.bypassSecurityTrustResourceUrl(`assets/piece_icons/${iconName}`)
    );
  }
  get IconName(): string {
    return `${this.playerColor}_${this.piece.pieceType.toString}`;
  }

  ngOnInit() {

  }
}
