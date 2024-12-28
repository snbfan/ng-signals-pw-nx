import { HttpClient } from '@angular/common/http';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { Observable, of } from 'rxjs';

import { BackendRequest } from '../models';

import { BackendCommunicationService } from './backend-communication.service';

describe('Service BackendCommunicationService:', () => {
  const post = jest.fn();
  let service: BackendCommunicationService;
  let spectator: SpectatorService<BackendCommunicationService>;

  const createService = createServiceFactory({
    service: BackendCommunicationService,
    providers: [{ provide: HttpClient, useValue: { post } }],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  describe('Method signUp: ', () => {
    it('should call httpClient post with correct params', () => {
      const payload = {
        firstName: '1',
        lastName: '2',
        email: 'a@a.a',
        password: 'password',
      };

      service.signUp(payload);

      expect(post).toHaveBeenCalledTimes(1);
      expect(post.mock.calls[0][1]).toEqual(payload);
    });

    it('should return Observable', () => {
      post.mockImplementation(() => of(''));
      const postResult$ = service.signUp({} as BackendRequest);
      expect(postResult$ instanceof Observable).toEqual(true);
    });
  });
});
