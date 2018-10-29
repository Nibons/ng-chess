import { Pipe, PipeTransform } from '@angular/core';

// CASES
// 0 = -
// 1 = A
// 2 = B
// ...
// 8 = H
// ...
// 26 = Z
// 27 = AA
// ...
// 26^2 = ZZ
// 26^2 + 1 = AAA

const zero = '-';

@Pipe({
  name: 'chessXAxisLabel'
})
export class ChessXAxisLabelPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    // TODO fix this
    return '';
  }

}
