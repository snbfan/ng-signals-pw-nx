import { ActivatedRoute, RouterModule } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { SubmittedStateService } from '../../core/services';
import { getTranslocoModule } from '../../core/testing';

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let spectator: Spectator<ConfirmationComponent>;
  const createComponent = createComponentFactory({
    component: ConfirmationComponent,
    mocks: [SubmittedStateService, ActivatedRoute],
    imports: [getTranslocoModule({ langs: { en: {} } }), RouterModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set submitted to false on initialization', () => {
    const submittedStateService = spectator.inject(SubmittedStateService);
    spectator.component.ngOnInit();

    expect(submittedStateService.submitted).toBe(false);
  });

  it('should render the template correctly', () => {
    const button = spectator.query('button');
    expect(button).toBeTruthy();
  });
});
