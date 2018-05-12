import { TestBed, inject } from '@angular/core/testing';

import { CityService } from './cities.service';

describe('CityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityService]
    });
  });

  it('should be created', inject([CityService], (service: CityService) => {
    expect(service).toBeTruthy();
  }));
});
