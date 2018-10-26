import { Component, OnInit, Input } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionQuery, Position } from 'src/app/chess-service/state/position';
import { Observable, from } from 'rxjs';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { map, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() positionCoords: ICoordinates = { dimensions: [] };
  @Input() boardId: ID = 0;

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

  isShaded$: Observable<boolean> = from(this.positionCoords.dimensions).pipe(
    // | |x|
    // |x| |
    // ex. [0,0] = true
    // ex. [0,1] = false
    // ex. [1,0] = false
    // ex. [1,1] = true
    reduce(((acc, val) => acc + val), 0),
    map(value => (value % 2) === 0)
  );

  constructor(
    protected positionQuery: PositionQuery
  ) { }

  ngOnInit() { }

}
