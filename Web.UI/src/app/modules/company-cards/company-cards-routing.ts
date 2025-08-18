import { CompanyCardActivitiesComponent } from './activities/activities.component';
import { CompanyCardImportantInfoComponent } from './important-info/important-info.component';
import { CompanyCardContactComponent } from './contacts/contacts.component';
import { CompanyCardsComponent } from './company-cards.component';
import { CompanyCardSalesComponent } from './sales/sales.component';
import { CompanyCardMarketingComponent } from './marketing/marketing.component';
import { CompanyCardHourAndProjectComponent } from './hour-and-project/hour-and-project.component';
import { CompanyCardServicesComponent } from './services/services.component';
import { CompanyCardWorkOrdersComponent } from './work-orders/work-orders.component';
import { CompanyCardEquipmentComponent } from './equipment/equipment.component';
import { CompanyCardOrdersComponent } from './orders/orders.component';
import { CompanyCardInvoicesComponent } from './invoices/invoices.component';
import { CompanyCardLedgerComponent } from './ledger/ledger.component';
import { CompanyCardHistoryComponent } from './history/history.component';
import { Routes } from '@angular/router';
import { CompanyCardsResolver } from './company-cards.resolver';

export const COMPANY_CARDS_ROUTES: Routes = [
    {
        path: ':id',
        resolve: { pageData: CompanyCardsResolver },
        component: CompanyCardsComponent,
        children: [
            { path: '', redirectTo: 'important-info', pathMatch: 'full' },
            {
                path: 'important-info',
                component: CompanyCardImportantInfoComponent,
            },
            {
                path: 'contacts',
                component: CompanyCardContactComponent,
            },
            {
                path: 'activities',
                component: CompanyCardActivitiesComponent,
            },
            {
                path: 'sales',
                component: CompanyCardSalesComponent,
            },
            {
                path: 'marketing',
                component: CompanyCardMarketingComponent,
            },
            {
                path: 'hour-and-project',
                component: CompanyCardHourAndProjectComponent,
            },
            {
                path: 'services',
                component: CompanyCardServicesComponent,
            },
            {
                path: 'work-orders',
                component: CompanyCardWorkOrdersComponent,
            },
            {
                path: 'equipment',
                component: CompanyCardEquipmentComponent,
            },
            {
                path: 'orders',
                component: CompanyCardOrdersComponent,
            },
            {
                path: 'invoices',
                component: CompanyCardInvoicesComponent,
            },
            {
                path: 'ledger',
                component: CompanyCardLedgerComponent,
            },
            {
                path: 'history',
                component: CompanyCardHistoryComponent,
            },
        ],
    },
];
