
export const FindLowest = (list: number[]) => list.reduce((a, b) => Math.min(a, b));
export const FindIndexForLowest = (list: number[]) => list.findIndex(val => val === FindLowest(list));
export const IncrementLowest = (list: number[]) =>
  list.map(
    (val: number, iter: number, array: number[]) => {
      if (iter === FindIndexForLowest(array)) { val++; }
      return val;
    }
  );

