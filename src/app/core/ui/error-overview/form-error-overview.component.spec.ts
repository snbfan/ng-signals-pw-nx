import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { FormErrorOverviewComponent } from './form-error-overview.component';

describe('FormErrorOverviewComponent', () => {
  let spectator: Spectator<FormErrorOverviewComponent>;
  const createComponent = createComponentFactory({
    component: FormErrorOverviewComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should return an empty array when errors and errorMap are null', () => {
    spectator.setInput('errors', null);
    spectator.setInput('errorMap', null);

    const errorMessages = spectator.component.errorMessages();
    expect(errorMessages).toEqual([]);
  });

  it('should return an empty array when errors is provided but errorMap is null', () => {
    spectator.setInput('errors', { required: true });
    spectator.setInput('errorMap', null);

    const errorMessages = spectator.component.errorMessages();
    expect(errorMessages).toEqual([]);
  });

  it('should return an empty array when errorMap is provided but errors is null', () => {
    spectator.setInput('errors', null);
    spectator.setInput('errorMap', { required: 'This field is required' });

    const errorMessages = spectator.component.errorMessages();
    expect(errorMessages).toEqual([]);
  });

  it('should return the correct error messages based on errors and errorMap', () => {
    spectator.setInput('errors', { required: true, minlength: true });
    spectator.setInput('errorMap', {
      required: 'This field is required',
      minlength: 'The value is too short',
    });

    const errorMessages = spectator.component.errorMessages();
    expect(errorMessages).toEqual([
      'This field is required',
      'The value is too short',
    ]);
  });

  it('should filter out errors not defined in errorMap', () => {
    spectator.setInput('errors', { required: true, maxlength: true });
    spectator.setInput('errorMap', {
      required: 'This field is required',
      minlength: 'The value is too short',
    });

    const errorMessages = spectator.component.errorMessages();
    expect(errorMessages).toEqual(['This field is required']);
  });
});
