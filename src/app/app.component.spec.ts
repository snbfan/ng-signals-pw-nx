import { RouterOutlet } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [],
    imports: [RouterOutlet],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const routerOutlet = spectator.query(RouterOutlet);
    expect(routerOutlet).toBeTruthy();
  });
});
