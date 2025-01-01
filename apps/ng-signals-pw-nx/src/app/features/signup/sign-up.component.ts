import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  effect
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { combineLatest, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { MainRoutes } from '../../app.routes';
import {
  BackendService,
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private readonly backendService = inject(BackendService);

  public readonly resourceStatus = this.backendService.resourceStatus;

  private readonly submittedStateService = inject(SubmittedStateService);
  private readonly router = inject(Router);
  private readonly subscriptions = new Subscription();

  constructor() {
    effect(this.disableFormOnLoading);
    effect(this.navigateOnSuccess);
  }

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

    this.backendService.requestSignal.set(this.form.getRawValue());
  }

  private checkIfPasswordCompromised(): Subscription {
    return combineLatest([
      this.firstName.valueChanges.pipe(startWith('')),
      this.lastName.valueChanges.pipe(startWith('')),
    ]).subscribe(() => {
      this.password.updateValueAndValidity();
    });
  }

  private disableFormOnLoading = (): void  => {
    if (this.resourceStatus.loading()) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  private navigateOnSuccess = (): void => {
    if (this.resourceStatus.success()) {
      this.backendService.destroy();
      this.submittedStateService.submitted = true;
      this.router.navigate([MainRoutes.Confirmation]);
    }
  }
}
