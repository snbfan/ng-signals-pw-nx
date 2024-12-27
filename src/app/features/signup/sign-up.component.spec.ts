import { Router } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { of, throwError } from 'rxjs';

import { BackendCommunicationService, SubmittedStateService, ValidationService } from '#core/services';
import { getTranslocoModule } from '#core/testing';

import { MainRoutes } from '../../app.routes';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let spectator: Spectator<SignUpComponent>;
  const friendlyErrorMessage = 'error';
  const createComponent = createComponentFactory({
    component: SignUpComponent,
    mocks: [BackendCommunicationService, SubmittedStateService, Router],
    imports: [getTranslocoModule({ langs: { en: { friendlyErrorMessage } } })],
    providers: [{ provide: ValidationService, useValue: { checkForForbiddenValues: () => ({ validate: jest.fn() }) }}]
  });

  const formData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Password123!',
  };

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize the form with default values and validators', () => {
    const form = spectator.component.form;

    expect(form).toBeTruthy();
    expect(form.get('firstName')?.validator).toBeTruthy();
    expect(form.get('lastName')?.validator).toBeTruthy();
    expect(form.get('email')?.validator).toBeTruthy();
    expect(form.get('password')?.validator).toBeTruthy();
  });

  it('should not submit the form if it is invalid', () => {
    const backendService = spectator.inject(BackendCommunicationService);
    jest.spyOn(backendService, 'signUp');

    spectator.component.submitForm();

    expect(backendService.signUp).not.toHaveBeenCalled();
  });

  it('should call signUp and navigate on successful submission', () => {

    const response = { ...formData };
    delete response.password;

    const backendService = spectator.inject(BackendCommunicationService);
    const router = spectator.inject(Router);

    jest.spyOn(backendService, 'signUp').mockReturnValue(of({ _id:'1', ...response }));
    jest.spyOn(router, 'navigate');

    spectator.component.form.setValue(formData);

    spectator.component.submitForm();

    expect(backendService.signUp).toHaveBeenCalledWith(formData);
    expect(router.navigate).toHaveBeenCalledWith([MainRoutes.Confirmation]);
  });

  it('should handle signUp errors gracefully', () => {
    const backendService = spectator.inject(BackendCommunicationService);

    jest.spyOn(backendService, 'signUp').mockReturnValue(throwError(() => new Error('Error')));

    spectator.component.form.setValue(formData);

    spectator.component.submitForm();

    expect(spectator.component.errorMessage()).toBe(friendlyErrorMessage);
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(spectator.component['subscriptions'], 'unsubscribe');

    spectator.component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
