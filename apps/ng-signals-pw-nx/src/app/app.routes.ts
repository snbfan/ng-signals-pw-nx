import { Route } from '@angular/router';

import { SubmittedStateGuard } from '#core/guards';

import { LayoutComponent } from './features/layout';

export enum MainRoutes {
  SignUp = 'signup',
  Confirmation = 'confirmation',
}

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: MainRoutes.SignUp,
      },
      {
        path: MainRoutes.SignUp,
        loadComponent: () =>
          import('./features/signup').then((m) => m.SignUpComponent),
      },
      {
        path: MainRoutes.Confirmation,
        loadComponent: () =>
          import('./features/confirmation').then(
            (m) => m.ConfirmationComponent
          ),
        canActivate: [SubmittedStateGuard],
      },
      { path: '**', pathMatch: 'full', redirectTo: MainRoutes.SignUp },
    ],
  },
];
