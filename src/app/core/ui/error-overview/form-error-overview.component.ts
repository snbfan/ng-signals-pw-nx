import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form-error-overview',
  templateUrl: './form-error-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorOverviewComponent {
  public errors = input<ValidationErrors | null>();
  public errorMap = input<ValidationErrors | null>();

  public readonly errorMessages: Signal<string[]> = computed(() => {
    const errors = this.errors();
    const errorMap = this.errorMap();

    if (!errors || !errorMap) {
      return [];
    }

    return Object.keys(errorMap)
      .filter((error) => !!errors[error])
      .map((error) => errorMap[error]);
  });
}
