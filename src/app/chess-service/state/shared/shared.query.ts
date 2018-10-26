import { ID } from '@datorama/akita';
import { Observable, from } from 'rxjs';
import { mergeMap, withLatestFrom, filter, map } from 'rxjs/operators';
import { IQueryableById } from 'src/app/chess-service/state/shared/queryableById.model';
import { tag } from 'rxjs-spy/operators';


export function getEntityByObservableId$<T extends IQueryableById>(
  list$: Observable<T[]>,
  itemId: Observable<ID>
): Observable<T> {
  return list$.pipe(
    mergeMap(itemList$ => from(itemList$)),
    withLatestFrom(itemId),
    filter(([item, id]) => item.id === id),
    map(([item, id]) => item),
    tag('entity')
  );
}
