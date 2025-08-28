import { TestBed } from '@angular/core/testing';

import { AboutHtmlAnimationsService } from './about-html-animations.service';

describe('AboutHtmlAnimationsService', () => {
  let service: AboutHtmlAnimationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutHtmlAnimationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
