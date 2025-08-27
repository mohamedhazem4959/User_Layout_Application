import { TestBed } from '@angular/core/testing';

import { TestimoinalsService } from './testimoinals.service';

describe('TestimoinalsService', () => {
  let service: TestimoinalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimoinalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
