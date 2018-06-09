import { ICoordinates } from '@chess/icoordinates.model';
import { PositionStateModel } from './../../chess-service/interfaces/iposition.model';
import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { PositionState } from '@chess/position-state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() positionId: number;
  @Select(PositionState.GetPositionById) positionStateModel$: Observable<(Id: number) => PositionStateModel>;
  position$: Observable<PositionStateModel>;
  coordinates: ICoordinates;
  dark_position: boolean;
  constructor(private store: Store) { }

  ngOnInit() {
    this.position$ = this.positionStateModel$.pipe(map(filterFn => filterFn(this.positionId)));
    this.position$.subscribe(
      (p: PositionStateModel) => this.coordinates = p.coordinates
    );
    this.checkIfDark();
  }
  private checkIfDark() {
    let coordinate_count = 0;
    this.coordinates.dimensions.forEach((val: number) => coordinate_count += val);
    this.dark_position = (coordinate_count % 2) === 0;
  }
}
