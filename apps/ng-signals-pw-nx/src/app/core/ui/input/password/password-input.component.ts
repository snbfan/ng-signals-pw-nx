import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormErrorOverviewComponent } from '#core/ui/error-overview';
import { BaseInputComponent } from '#core/ui/input/base-input.component';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorOverviewComponent],
})
export class PasswordInputComponent extends BaseInputComponent {
  public readonly toggleAriaLabel = input.required<string>();
  public readonly showPassword = signal<boolean>(false);
}
