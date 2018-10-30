import { Pipe, PipeTransform } from '@angular/core';

// CASES
// 0 = -
// 1 = A
// 2 = B
// ...
// 8 = H
// ...
// 26 = Z

const zero = '-';
const alphabet_array: string[] = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');

@Pipe({
  name: 'chessXAxisLabel'
})
export class ChessXAxisLabelPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return value === 0 ?
      '-' :
      alphabet_array[value - 1];
  }

}
