import { Routes } from '@angular/router';
import { Companies } from './companies';
import { CompanyCardsResolver } from './company-cards/company-cards.resolver';

export const COMPANY_ROUTES: Routes = [
  {
    path: '',
    component: Companies,
  },
  {
    path: 'view',
    providers: [CompanyCardsResolver],
    loadChildren: () =>
      import('./company-cards/company-cards-routing').then(
        (m) => m.COMPANY_CARDS_ROUTES,
      ),
  },
];
