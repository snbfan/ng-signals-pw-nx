import { FormControl } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PasswordInputComponent } from '#ui-components';

describe('PasswordInputComponent', () => {
  let spectator: Spectator<PasswordInputComponent>;
  const defaultParams = {
    control: new FormControl(),
    label: 'password',
    toggleAriaLabel: 'toggle button',
    errorMap: { required: 'required' },
  };
  const createComponent = createComponentFactory({
    component: PasswordInputComponent,
  });
  const createComponentWithInputs = (params?: Record<string, unknown>) => {
    return createComponent({ props: { ...defaultParams, ...params } });
  };

  it('should create the component', () => {
    spectator = createComponentWithInputs({ name: 'password' });
    expect(spectator.component).toBeTruthy();
  });

  it('should have a default name generated', () => {
    spectator = createComponentWithInputs();
    expect(spectator.component.name()).toMatch(/input-field-\d+/);
  });

  it('should allow overriding the name input', () => {
    spectator = createComponentWithInputs({ name: 'custom-name' });
    expect(spectator.component.name()).toBe('custom-name');
  });

  it('should default to an input type of "text"', () => {
    spectator = createComponentWithInputs();
    expect(spectator.component.inputType()).toBe('text');
  });

  it('should allow overriding the inputType input', () => {
    spectator = createComponentWithInputs({ inputType: 'password' });
    expect(spectator.component.inputType()).toBe('password');
  });

  it('should allow setting and getting a label', () => {
    spectator = createComponentWithInputs({ label: 'Test Label' });
    expect(spectator.component.label()).toBe('Test Label');
  });

  it('should track validation errors through errorMap', () => {
    const errorMap = { required: 'This field is required' };
    spectator = createComponentWithInputs({ errorMap });
    expect(spectator.component.errorMap()).toEqual(errorMap);
  });

  it('should increment the identifier for each component instance', () => {
    spectator = createComponentWithInputs();
    const spectator2 = createComponentWithInputs();
    const name1 = spectator.component.name();
    const name2 = spectator2.component.name();

    expect(name1).not.toBe(name2);
    expect(name2).toMatch(/input-field-\d+/);
  });
});
