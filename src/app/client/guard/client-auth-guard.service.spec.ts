import { TestBed, inject } from '@angular/core/testing';

import { ClientAuthGuardService } from './client-auth-guard.service';

describe('ClientAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientAuthGuardService]
    });
  });

  it('should be created', inject([ClientAuthGuardService], (service: ClientAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
