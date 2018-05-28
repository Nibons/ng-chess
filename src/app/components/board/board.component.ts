import { Component, OnInit } from '@angular/core';
import { Board } from '@chess/board';
import { IPosition } from '@chess/iposition';
import { IDimensions } from '@chess/idimensions.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  columns = Array(this.board.dimensions.max.x - this.board.dimensions.min.x);
  rows = Array(this.board.dimensions.max.y - this.board.dimensions.min.y);
  constructor(public board: Board) {
  }

  ngOnInit() {

  }
