import { TestBed } from '@angular/core/testing';

import { CestaServiceService } from './cesta-service.service';

describe('CestaServiceService', () => {
  let service: CestaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CestaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
