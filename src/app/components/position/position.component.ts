import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  dark_position: boolean = ((this.position.x + this.position.y) % 2) === 0;
  constructor() { }

  ngOnInit() {
  }

}
