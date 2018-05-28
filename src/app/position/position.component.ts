import { Component, OnInit, Input } from '@angular/core';
import { IPosition } from '@chess/iposition';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() position: IPosition;
  dark_position: boolean = ((this.position.x + this.position.y) % 2) === 0;
  constructor() { }

  ngOnInit() {
  }

}
