/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleGuard } from './RoleGuard.service';

describe('Service: RoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGuard]
    });
  });

  it('should ...', inject([RoleGuard], (service: RoleGuard) => {
    expect(service).toBeTruthy();
  }));
});
