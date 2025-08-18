import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { CompanyCardsResolver } from './modules/company-cards/company-cards.resolver';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [ {
                path: 'companies',
                component: LayoutComponent,
            },
            {
                path: 'company-cards',
                providers: [CompanyCardsResolver],
                loadChildren: () =>
                    import(
                        './modules/company-cards/company-cards-routing'
                    ).then((m) => m.COMPANY_CARDS_ROUTES),
            },
        ],
    },
];
