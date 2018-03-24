import { TestBed, inject } from '@angular/core/testing';
import { TestUniformidadService } from './test-uniformidad.service';

describe('TestUniformidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestUniformidadService]
    });
  });

  it('should be created', inject([TestUniformidadService], (service: TestUniformidadService) => {
    expect(service).toBeTruthy();
  }));
});
