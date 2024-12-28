import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseInputComponent } from '../base-input.component';
import { FormErrorOverviewComponent } from '../../error-overview';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorOverviewComponent],
})
export class TextInputComponent extends BaseInputComponent {}
