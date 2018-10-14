import { Component, OnInit, Input } from '@angular/core';
import { ID } from '@datorama/akita';
import { PositionQuery, Position } from 'src/app/chess-service/state/position';
import { Observable } from 'rxjs';
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

  positionId$: Observable<ID>;
  position$: Observable<Position>;


  coordinates$(): Observable<ICoordinates> {
    return this.position$.pipe(
      map(position => position.coordinates)
    );
  }
  isEmpty$(): Observable<boolean> {
    return this.position$.pipe(
      map(position => position.pieceId === null)
    );
  }
  isOccupied$(): Observable<boolean> { return this.isEmpty$().pipe(map(isEmpty => !isEmpty)); }
  pieceId$(): Observable<ID | null> { return this.position$.pipe(map(position => position.pieceId)); }
  isSelected$(): Observable<boolean> {
    return this.position$.pipe(map(position => position.selected));
  }

  isShaded$(): boolean {

    // | |x|
    // |x| |
    // ex. [0,0] = true
    // ex. [0,1] = false
    // ex. [1,0] = false
    // ex. [1,1] = true

    let iterate = 0;
    this.positionCoords.dimensions.forEach(n => iterate = iterate + n);
    return ((iterate % 2) === 0);
  }

  constructor(protected positionQuery: PositionQuery) {
    this.position$ = positionQuery
      .positionByCoordinates$(this.positionCoords, this.boardId);
    this.positionId$ = this.position$.pipe(map(p => p.id));
  }

  ngOnInit() { }

}
