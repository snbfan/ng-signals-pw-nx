import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormErrorOverviewComponent } from '#core/ui/error-overview';
import { BaseInputComponent } from '#core/ui/input/base-input.component';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorOverviewComponent],
})
export class TextInputComponent extends BaseInputComponent {}
