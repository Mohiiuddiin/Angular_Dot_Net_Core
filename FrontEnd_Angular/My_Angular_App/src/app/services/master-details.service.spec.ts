import { TestBed } from '@angular/core/testing';

import { MasterDetailsService } from './master-details.service';

describe('MasterDetailsService', () => {
  let service: MasterDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
