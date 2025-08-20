import { Component, inject, Signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TableComponent } from '../../../@shared/components/table/table.component';
import { CompanyInfo } from '../../../../core/api-clients/company/models/company-info.model';
import { DealCardView } from '../../../../core/api-clients/company/models/deal-card-view.model';
import { UpSellingCardView } from '../../../../core/api-clients/company/models/upselling-card-view.model';
import { dealColumns, upSellingCols } from './table-columns.constant';
import { PagingOptions } from '../../../../core/api-clients/pagination.model';
import { CompanyClient } from '../../../../core/api-clients/company/company.client';
import { mapPrimengSortEnumToSortDirectionEnum } from '../../../../core/enums/table.enum';
import { ToastService } from '../../../@shared/components/toast/toast.service';

@Component({
  selector: 'app-company-card-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
  imports: [
    PanelModule,
    ButtonModule,
    ToggleSwitchModule,
    FormsModule,
    TableModule,
    CheckboxModule,
    PaginatorModule,
    TranslatePipe,
    TableComponent,
  ],
})
export class CompanyCardSalesComponent {
  private getCompanyInfo = inject(ROUTER_OUTLET_DATA) as Signal<CompanyInfo>;
  private translateService = inject(TranslateService);
  private toastService = inject(ToastService);
  companyId = this.getCompanyInfo().customerId;
  isShowAll = true;
  includeDeleted = false;
  deals: DealCardView[] = [];
  upSellings: UpSellingCardView[] = [];
  dealColumns = dealColumns;
  upSellingTableCols = upSellingCols;

  pagingOptions: PagingOptions = {
    pageSize: 20,
    pageNumber: 1,
  };
  totalRecords = 0;
  constructor(private companyClient: CompanyClient) {
    this.getDeals();
    this.getUpsellings();
  }
  onToggleShowAll(): void {
    this.getDeals();
  }
  onCheckedIncludeDeleted(event: any): void {
    this.getDeals();
  }

  pageChange(event: any) {
    this.pagingOptions.pageSize = event.rows;
    this.pagingOptions.pageNumber = event.page + 1;
    this.getDeals();
  }
  pageSort(event: any): void {
    this.pagingOptions.sortDirection = mapPrimengSortEnumToSortDirectionEnum(
      event.order,
    );
    this.pagingOptions.sortField = event.field;
    this.getDeals();
  }
  shouldShowEditUpsellingBtn(upselling: UpSellingCardView): boolean {
    return !upselling.inUse && !upselling.activeDeal;
  }
  editUpselling(upselling: UpSellingCardView): void {
    this.toastService.success(
      this.translateService.instant('Common.ComingSoon'),
    );
  }
  showDealServiceDialog(upselling: UpSellingCardView): void {
    this.toastService.success(
      this.translateService.instant('Common.ComingSoon'),
    );
  }
  navigateToDealActivityDetailsPage(deal: DealCardView): void {
    const url = `/Deal/LeadActivities?dealId=${deal.dealId}`;
    window.open(url);
  }
  getAggrementDetailsUrl(upselling: UpSellingCardView): string {
    return `/Services/CustomerView?AgreementDetailId=${upselling.agreementDetailId}`;
  }
  private getDeals(): void {
    const activities$ = this.isShowAll
      ? this.companyClient.getInactiveDeals(
          this.companyId,
          this.includeDeleted,
          this.pagingOptions,
        )
      : this.companyClient.getLatestDeals(
          this.companyId,
          this.includeDeleted,
          this.pagingOptions,
        );
    const subscription = activities$.subscribe((result) => {
      this.deals = result.items;
      this.totalRecords = result.totalItemCount;
      subscription.unsubscribe();
    });
  }

  getUpsellings(): void {
    this.companyClient
      .getUpsellings(this.companyId, {
        pageNumber: 1,
        pageSize: 4000,
      } as PagingOptions)
      .subscribe((result) => {
        this.upSellings = result.items;
      });
  }
}
