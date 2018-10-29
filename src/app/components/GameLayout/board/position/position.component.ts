import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionQuery, Position } from 'src/app/chess-service/state/position';
import { Observable, of } from 'rxjs';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() positionCoords: ICoordinates = { dimensions: [] };
  @Input() boardId: ID = 0;
  @Input() isDarkened = false;

  position$: Observable<Position> = new Observable();
  isOccupied$ = new Observable();
  pieceId$ = new Observable();


  // TODO make this actually do something
  showCoords$: Observable<boolean> = of(false);
  isSelected$: Observable<boolean> = new Observable<boolean>();


  constructor(
    protected positionQuery: PositionQuery
  ) { }

  ngOnInit() {
    this.position$ = this.positionQuery
      .selectPositionByCoordinates(this.positionCoords, this.boardId);
    this.isOccupied$ = this.positionQuery
      .selectIsOccupiedCoordinates(this.positionCoords, this.boardId);
    this.pieceId$ = this.position$.pipe(
      map(position => position.pieceId as ID)
    );
    this.isSelected$ = this.position$.pipe(map(position => position.selected));
  }

  darkenedClass(): string {
    return this.isDarkened ? 'shaded-position' : 'unshaded-position';
  }
}
