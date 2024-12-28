import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseInputComponent } from '../base-input.component';
import { FormErrorOverviewComponent } from '../../error-overview';

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
