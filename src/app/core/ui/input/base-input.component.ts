import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

let nextIdentifier = 1;

@Component({
  standalone: true,
  selector: 'app-base-input',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseInputComponent {
  public control = input.required<FormControl>();
  public name = input(`input-field-${nextIdentifier++}`);
  public label = input<string>();
  public errorMap = input<ValidationErrors | null>();
  public inputType = input('text');

  protected required = computed(() =>
    [Validators.required].some((validator) => this.control().hasValidator(validator)),
  );

  protected id = computed(() => 'input-' + this.name());
}
