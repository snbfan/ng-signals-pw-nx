import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

let nextIdentifier = 1;

@Component({
  standalone: true,
  selector: 'app-base-input',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseInputComponent {
  public readonly control = input.required<FormControl>();
  public readonly name = input(`input-field-${nextIdentifier++}`);
  public readonly label = input<string>();
  public readonly errorMap = input<ValidationErrors | null>();
  public readonly inputType = input('text');

  protected readonly required = computed(() =>
    [Validators.required].some((validator) =>
      this.control().hasValidator(validator)
    )
  );

  protected readonly id = computed(() => 'input-' + this.name());
}
