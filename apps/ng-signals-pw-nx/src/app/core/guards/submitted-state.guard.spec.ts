import { Router, UrlTree } from '@angular/router';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { SubmittedStateService } from '../services';

import { SubmittedStateGuard } from './submitted-state.guard';

describe('SubmittedStateGuard', () => {
  let spectator: SpectatorService<SubmittedStateGuard>;
  let router: Router;

  const submittedStub = jest.fn();

  const createService = createServiceFactory({
    service: SubmittedStateGuard,
    mocks: [Router],
    providers: [
      {
        provide: SubmittedStateService,
        useValue: { submitted: submittedStub },
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    router = spectator.inject(Router);
  });

  describe('canActivate', () => {
    it('should return true when submitted is true', (done) => {
      submittedStub.mockReturnValue(true);

      spectator.service.canActivate().subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
    });

    it('should return a UrlTree when submitted is false', (done) => {
      const mockUrlTree = {} as unknown as UrlTree;
      submittedStub.mockReturnValue(false);
      jest.spyOn(router, 'parseUrl').mockReturnValue(mockUrlTree);

      spectator.service.canActivate().subscribe((result) => {
        expect(result).toBe(mockUrlTree);
        expect(router.parseUrl).toHaveBeenCalledWith('/');
        done();
      });
    });
  });
});
