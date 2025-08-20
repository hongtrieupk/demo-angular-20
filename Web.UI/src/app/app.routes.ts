import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'companies',
        loadChildren: () =>
          import('./modules/companies/companies-routing').then(
            (m) => m.COMPANY_ROUTES,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/companies' },
];
