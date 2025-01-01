import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, inject, signal, ResourceStatus } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

import { BackendRequest, BackendResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class BackendService {
  public readonly requestSignal = signal<BackendRequest | undefined>(undefined);
  public readonly resourceStatus = {
    loading: computed(() => this.resource.isLoading()),
    error: computed(() => this.resource.status() === ResourceStatus.Error),
    success: computed(() => this.resource.status() === ResourceStatus.Resolved)
  }

  private readonly http = inject(HttpClient);
  private readonly serverUrl = 'https://demo-api.now.sh/users';
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private resource = rxResource({
    request: this.requestSignal,
    loader: (param) => {
      return this.sendBackendRequest(param.request);
    }
  });

  public destroy(): void {
    this.resource.destroy();
  }

  private sendBackendRequest(payload: BackendRequest): Observable<BackendResponse> {
    delete payload.password;
    return this.http.post<BackendResponse>(this.serverUrl, payload, this.httpOptions);
  }
}
