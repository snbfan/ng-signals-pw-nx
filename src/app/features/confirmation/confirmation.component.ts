import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

import { SubmittedStateService } from "#core/services";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslocoModule, RouterModule]
})
export class ConfirmationComponent implements OnInit {
  private readonly submittedStateService = inject(SubmittedStateService);

  public ngOnInit(): void {
    this.submittedStateService.submitted = false;
  }
}

