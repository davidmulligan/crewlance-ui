import { TestBed, inject } from '@angular/core/testing';

import { FreelancerAuthGuardService } from './freelancer-auth-guard.service';

describe('FreelancerAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreelancerAuthGuardService]
    });
  });

  it('should be created', inject([FreelancerAuthGuardService], (service: FreelancerAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
