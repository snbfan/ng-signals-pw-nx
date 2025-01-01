import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { BackendRequest, BackendResponse } from '../models';

import { BackendService } from './backend.service';

describe('BackendService', () => {
  let spectator: SpectatorHttp<BackendService>;
  const createService = createHttpFactory(BackendService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should create the service', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('sendBackendRequest', () => {
    it('should send a POST request to the correct URL with the correct payload', () => {
      const payload: BackendRequest = { firstName: 'test', lastName: 'test', email: 'test', password: 'secret' };
      const expectedPayload = { firstName: 'test', lastName: 'test', email: 'test' };

      spectator.service['sendBackendRequest'](payload).subscribe();

      const req = spectator.expectOne(spectator.service['serverUrl'], HttpMethod.POST);
      expect(req.request.body).toEqual(expectedPayload);
      req.flush({ success: true });
    });

    it('should handle successful responses', () => {
      const payload: BackendRequest = { firstName: 'test', lastName: 'test', email: 'test', password: 'secret' };
      const mockResponse: BackendResponse = { firstName: 'test', lastName: 'test', email: 'test', _id: '245345' };

      spectator.service['sendBackendRequest'](payload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = spectator.expectOne(spectator.service['serverUrl'], HttpMethod.POST);
      req.flush(mockResponse);
    });

    it('should handle error responses', () => {
      const payload: BackendRequest = { firstName: 'test', lastName: 'test', email: 'test', password: 'secret' };

      spectator.service['sendBackendRequest'](payload).subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = spectator.expectOne(spectator.service['serverUrl'], HttpMethod.POST);
      req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('destroy', () => {
    it('should call destroy on the resource', () => {
      const destroySpy = jest.spyOn(spectator.service['resource'], 'destroy');
      spectator.service.destroy();
      expect(destroySpy).toHaveBeenCalled();
    });
  });
});
