import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { DemoComponents } from './modules/demo-components/demo-components';

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
      {
        path: 'demo-components',
        component: DemoComponents
      }
    ],
  },
  { path: '**', redirectTo: '/companies' },
];
