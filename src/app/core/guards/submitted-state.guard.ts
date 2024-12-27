import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SubmittedStateService } from '../services';

@Injectable({ providedIn: 'root' })
export class SubmittedStateGuard  {
  private readonly submittedStateService = inject(SubmittedStateService)
  private readonly router = inject(Router);

  public canActivate(): Observable<UrlTree | boolean> {
    return of(this.submittedStateService.submitted() || this.router.parseUrl('/'));
  }
}
