import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Position } from './position.model';

export interface PositionState extends EntityState<Position> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'position' })
export class PositionStore extends EntityStore<PositionState, Position> {

  constructor() {
    super();
  }

}

