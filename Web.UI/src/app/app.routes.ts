import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { CompanyCardsResolver } from './modules/companies/company-cards/company-cards.resolver';
import { Companies } from './modules/companies/companies';

export const routes: Routes = [
  {
    path: '', // , redirectTo: '/companies', pathMatch: 'full'
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
