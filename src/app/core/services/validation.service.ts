import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  static readonly passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&\-_]{8,}$/;

  public checkForForbiddenValues(forbiddenValues: () => (string | null)[]): ValidatorFn {
    return (control: AbstractControl) => {
      const normalizedValue = control.value?.toLowerCase();
      if (!normalizedValue) {
        return null;
      }
      const normalizedForbiddenValues = forbiddenValues()
        .map((v) => v?.trim())
        .filter((v) => (v?.length ?? 0) > 0)
        .map((v) => v?.toLowerCase());

      return normalizedForbiddenValues.some((v) => normalizedValue.includes(v)) ? { forbiddenValues: true } : null;
    };
  }
}
