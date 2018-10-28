import { Component, OnInit, Input } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionQuery, Position } from 'src/app/chess-service/state/position';
import { Observable, from, of } from 'rxjs';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { map, reduce, tap, mergeMap } from 'rxjs/operators';
const add = (a: number, b: number) => a + b as number;
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() positionCoords: ICoordinates = { dimensions: [] };
  @Input() boardId: ID = 0;
  @Input() isDarkened = false;

  position$: Observable<Position> =
    this.positionQuery.selectPositionByCoordinates$(this.positionCoords, this.boardId);
  positionId$: Observable<ID> = this.position$.pipe(map(p => p.id));


  isOccupied$: Observable<boolean> = this.position$.pipe(
    map(position => position.pieceId !== null)
  );
  isEmpty$: Observable<boolean> = this.isOccupied$.pipe(map(b => !b));


  coordinates$: Observable<ICoordinates> = this.position$.pipe(
    map(position => position.coordinates)
  );

  isSelected$: Observable<boolean> =
    this.position$.pipe(map(position => position.selected));

  pieceId$: Observable<ID | null> =
    this.position$.pipe(map(position => position.pieceId));

  constructor(
    protected positionQuery: PositionQuery
  ) { }

  ngOnInit() { }

  darkenedClass(): string {
    return this.isDarkened ? 'shaded-position' : 'unshaded-position';
  }
}
