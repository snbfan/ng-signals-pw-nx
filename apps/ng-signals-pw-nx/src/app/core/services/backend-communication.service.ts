import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BackendRequest, BackendResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class BackendCommunicationService {
  private readonly http = inject(HttpClient);
  private readonly serverUrl = 'https://demo-api.now.sh/users';
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public signUp(payload: BackendRequest): Observable<BackendResponse> {
    delete payload.password;
    return this.http.post<BackendResponse>(
      this.serverUrl,
      payload,
      this.httpOptions
    );
  }
}
