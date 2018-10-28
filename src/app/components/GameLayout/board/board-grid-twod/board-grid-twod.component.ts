import { Component, OnInit, Input } from '@angular/core';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-board-grid-twod',
  templateUrl: './board-grid-twod.component.html',
  styleUrls: ['./board-grid-twod.component.css']
})
export class BoardGridTwodComponent implements OnInit {
  @Input() boardId: ID = 0;
  @Input() columnList: number[] = [];
  @Input() rowList: number[] = [];
  @Input() squareSize = '70px';

  rowCount = 0;
  columnCount = 0;

  constructor() { }

  ngOnInit() {
    this.columnCount = this.columnList.length;
    this.rowCount = this.rowList.length;
  }

  isDarkened(xVal: number, yVal: number): boolean {
    const sum = xVal + yVal;
    return sum % 2 === 0;
  }

  repeat(repitions: number, template: string): string {
    return ` ${template}`.repeat(repitions);
  }

}
