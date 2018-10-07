import { Component, OnInit, Input } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionQuery, Position } from 'src/app/chess-service/state/position';
import { Observable, of, Subject } from 'rxjs';
import { ICoordinates } from 'src/app/chess-service/interfaces/icoordinates.model';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() positionId$: Observable<ID>;


  position$(): Observable<Position> { return this.positionQuery.positionById$(this.positionId$); }
  coordinates$(): Observable<ICoordinates> {
    return this.position$().pipe(
      map(position => position.coordinates)
    );
  }
  isEmpty$(): Observable<boolean> {
    return this.position$().pipe(
      map(position => position.pieceId === null)
    );
  }
  isOccupied$(): Observable<boolean> { return this.isEmpty$().pipe(map(isEmpty => !isEmpty)); }
  pieceId$(): Observable<ID | null> { return this.position$().pipe(map(position => position.pieceId)); }
  isSelected$(): Observable<boolean> {
    return this.position$().pipe(map(position => position.selected));
  }

  constructor(protected positionQuery: PositionQuery) {
    this.positionId$ = of(0);
  }

  ngOnInit() { }

}
