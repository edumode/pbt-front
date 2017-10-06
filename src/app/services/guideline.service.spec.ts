import { TestBed, inject } from '@angular/core/testing';

import { GuidelineService } from './guideline.service';

describe('GuidelineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuidelineService]
    });
  });

  it('should be created', inject([GuidelineService], (service: GuidelineService) => {
    expect(service).toBeTruthy();
  }));
});
