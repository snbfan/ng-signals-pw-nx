import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormErrorOverviewComponent } from '#core/ui/error-overview';
import { BaseInputComponent } from '#core/ui/input/base-input.component';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorOverviewComponent]
})
export class PasswordInputComponent extends BaseInputComponent {
  public toggleAriaLabel = input.required<string>();
  public showPassword = signal<boolean>(false);
}
