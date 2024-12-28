import { FormControl } from '@angular/forms';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let spectator: SpectatorService<ValidationService>;
  const createService = createServiceFactory(ValidationService);

  beforeEach(() => {
    spectator = createService();
  });

  describe('checkForForbiddenValues', () => {
    it('should return null if control value is null or empty', () => {
      const forbiddenValues = () => ['forbidden', 'test'];
      const validatorFn =
        spectator.service.checkForForbiddenValues(forbiddenValues);

      const control = new FormControl(null);
      expect(validatorFn(control)).toBeNull();

      control.setValue('');
      expect(validatorFn(control)).toBeNull();
    });

    it('should return an error object if control value contains a forbidden value', () => {
      const forbiddenValues = () => ['forbidden', 'test'];
      const validatorFn =
        spectator.service.checkForForbiddenValues(forbiddenValues);

      const control = new FormControl('This is a forbidden value.');
      expect(validatorFn(control)).toEqual({ forbiddenValues: true });

      control.setValue('Test case');
      expect(validatorFn(control)).toEqual({ forbiddenValues: true });
    });

    it('should return null if control value does not contain any forbidden value', () => {
      const forbiddenValues = () => ['forbidden', 'test'];
      const validatorFn =
        spectator.service.checkForForbiddenValues(forbiddenValues);

      const control = new FormControl('This is a safe value.');
      expect(validatorFn(control)).toBeNull();
    });

    it('should handle forbidden values with leading or trailing spaces correctly', () => {
      const forbiddenValues = () => ['  forbidden  ', ' test '];
      const validatorFn =
        spectator.service.checkForForbiddenValues(forbiddenValues);

      const control = new FormControl('Contains forbidden value');
      expect(validatorFn(control)).toEqual({ forbiddenValues: true });

      control.setValue('Safe value');
      expect(validatorFn(control)).toBeNull();
    });

    it('should handle case-insensitive matching for forbidden values', () => {
      const forbiddenValues = () => ['ForBidDen', 'TeSt'];
      const validatorFn =
        spectator.service.checkForForbiddenValues(forbiddenValues);

      const control = new FormControl('this is FORBIDDEN.');
      expect(validatorFn(control)).toEqual({ forbiddenValues: true });

      control.setValue('Completely safe');
      expect(validatorFn(control)).toBeNull();
    });
  });
});
