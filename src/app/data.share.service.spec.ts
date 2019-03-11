import { TestBed, inject } from '@angular/core/testing';

import { Data.ShareService } from './data.share.service';

describe('Data.ShareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Data.ShareService]
    });
  });

  it('should be created', inject([Data.ShareService], (service: Data.ShareService) => {
    expect(service).toBeTruthy();
  }));
});
