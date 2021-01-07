import { TestBed } from '@angular/core/testing';

import { CredentialsInterceptorService } from './credentials-interceptor.service';

describe('CredentialsInterceptorService', () => {
  let service: CredentialsInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialsInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
