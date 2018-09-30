/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OathLoginService } from './OathLogin.service';

describe('Service: OathLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OathLoginService]
    });
  });

  it('should ...', inject([OathLoginService], (service: OathLoginService) => {
    expect(service).toBeTruthy();
  }));
});
