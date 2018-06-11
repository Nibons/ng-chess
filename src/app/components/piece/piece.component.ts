import { GameState } from '@chess/game-state';
import { PieceStateModel, PieceStateModelList } from '@chess/ipiece.model';
import { PieceState } from '@chess/piece-state';
import { Component, OnInit, Input } from '@angular/core';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { IPlayer } from '@chess/iplayer.model';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() pieceId: number = null;
  @Select(PieceState.getPieceById) private pieceStateModelFilter$: Observable<(Id: number) => PieceStateModel>;
  private piece$: Observable<PieceStateModel>;
  public piece: PieceStateModel;
  @Select(GameState.getColors) private colors$: Observable<string[]>;
  color: string;
  playerNumber: number;

  constructor(private store: Store, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
    return `${this.color}_${this.piece.pieceType.toString}`;
  }

  ngOnInit() {
    this.piece$ = this.pieceStateModelFilter$.pipe(map(filterFn => filterFn(this.pieceId)));
    this.piece$.pipe(
      map((p: PieceStateModel) => this.onPieceStateUpdate(p))
    );
  }
  private onPieceStateUpdate(piece: PieceStateModel) {
    this.piece = piece;
    this.playerNumber = piece.playerNumber;
    this.setColor();
  }
  private setColor() {
    this.colors$.pipe(
      map(val =>
        this.color = val.find(
          (colorName, i) => i === this.playerNumber)
      )
    );
  }
}
