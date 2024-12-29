import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { combineLatest, EMPTY, Subscription } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators';

import { MainRoutes } from '../../app.routes';
import {
  BackendCommunicationService,
  SubmittedStateService,
  ValidationService,
} from '../../core/services';


import { PasswordInputComponent, TextInputComponent } from '#ui-components';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PasswordInputComponent,
    ReactiveFormsModule,
    TextInputComponent,
    TranslocoModule,
  ],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public readonly errorMessage = signal<string | undefined>(undefined);

  public readonly firstName = new FormControl<string>('', Validators.required);
  public readonly lastName = new FormControl<string>('', Validators.required);
  public readonly email = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);

  private readonly validationService = inject(ValidationService);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly password = new FormControl<string>('', [
    Validators.required,
    Validators.pattern(ValidationService.passwordRegexp),
    this.validationService.checkForForbiddenValues(() =>
      [this.firstName.value, this.lastName.value, this.email.value].filter(
        (value) => value !== undefined
      )
    ),
  ]);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly form = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
  });

  private readonly backendCommunicationService = inject(
    BackendCommunicationService
  );
  private readonly submittedStateService = inject(SubmittedStateService);
  private readonly translocoService = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly subscriptions = new Subscription();

  public ngOnInit(): void {
    this.subscriptions.add(this.checkIfPasswordCompromised());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public submitForm(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    this.subscriptions.add(this.sendDataToBackend());
  }

  private checkIfPasswordCompromised(): Subscription {
    return combineLatest([
      this.firstName.valueChanges.pipe(startWith('')),
      this.lastName.valueChanges.pipe(startWith('')),
    ]).subscribe(() => {
      this.password.updateValueAndValidity();
    });
  }

  private sendDataToBackend(): Subscription {
    this.form.disable();
    return this.backendCommunicationService
      .signUp(this.form.getRawValue())
      .pipe(
        catchError(() => {
          this.errorMessage.set(
            this.translocoService.translate('friendlyErrorMessage')
          );
          return EMPTY;
        }),
        finalize(() => this.form.enable())
      )
      .subscribe(() => {
        this.submittedStateService.submitted = true;
        this.router.navigate([MainRoutes.Confirmation]);
      });
  }
}
