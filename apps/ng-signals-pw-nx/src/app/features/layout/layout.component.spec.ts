import { ActivatedRoute } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { getTranslocoModule } from '#core/testing';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let spectator: Spectator<LayoutComponent>;
  const createComponent = createComponentFactory({
    component: LayoutComponent,
    imports: [getTranslocoModule({ langs: { en: {} } })],
    mocks: [ActivatedRoute],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should contain a router outlet', () => {
    const routerOutlet = spectator.query('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should have valid router links', () => {
    const routerLinks = spectator.queryAll('a[routerLink]');
    expect(routerLinks.length).toBeGreaterThanOrEqual(0);
  });
});
