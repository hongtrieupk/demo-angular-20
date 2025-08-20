import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { activitiesColumns } from './table-columns.constant';
import { ToastService } from '../../../@shared/components/toast/toast.service';
import { TableComponent } from '../../../@shared/components/table/table.component';
import { isEmptyGuid, toUpperFirstChar } from '../../../../core/ultis/string-utils';
import { ActivityTypesEnum } from '../../../../core/enums/deal-activity-types.enum';
import { PagingOptions } from '../../../../core/api-clients/pagination.model';
import { ActivityCardView } from '../../../../core/api-clients/company/models/activity-card-view.model';
import { CompanyInfo } from '../../../../core/api-clients/company/models/company-info.model';
import { CompanyClient } from '../../../../core/api-clients/company/company.client';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../@shared/components/spinner/loading.service';

@Component({
  selector: 'app-company-card-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
  imports: [
    PanelModule,
    ButtonModule,
    ToggleSwitchModule,
    FormsModule,
    TranslatePipe,
    TableComponent,
  ],
})
export class CompanyCardActivitiesComponent {
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService);
  private translateService = inject(TranslateService);
  getCompanyInfo = inject(ROUTER_OUTLET_DATA) as Signal<CompanyInfo>;
  companyId = this.getCompanyInfo().id;
  customerPrimaryContactId = this.getCompanyInfo().companyPrimaryContactId;
  isShowAll = true;
  activities: ActivityCardView[] = [];
  activitiesColumns = activitiesColumns;
  pagingOptions: PagingOptions = {
    pageSize: 5,
    pageNumber: 1,
  };
  totalRecords = 0;
  constructor(private companyClient: CompanyClient) {
    this.getActivities();
  }

  onToggleShowAll(): void {
    this.getActivities();
  }
  hasNoDeal(activity: ActivityCardView): boolean {
    return !activity.dealId || isEmptyGuid(activity.dealId);
  }
  onEditActivityCell(activity: ActivityCardView): void {
    this.toastService.success(
      this.translateService.instant('Common.ComminSoon'),
    );
  }

  pageSort(event: any): void {
    this.pagingOptions.sortField = toUpperFirstChar(event.field);
    this.pagingOptions.sortDirection = event.order;
    this.getActivities();
  }
  pageChange(event: any) {
    this.pagingOptions.pageSize = event.rows;
    this.pagingOptions.pageNumber = event.page + 1;
    this.getActivities();
  }

  private getActivities(): void {
    this.loadingService.show();
    this.companyClient
      .getActivities(this.companyId, this.isShowAll, this.pagingOptions)
      .subscribe((result) => {
        this.activities = result.items;
        this.totalRecords = result.totalItemCount;
        this.loadingService.hide();
      });
  }
  showCreateDealActivityNoteDialog() {
    this.toastService.success(
      this.translateService.instant('Common.ComminSoon'),
    );
  }

  showCreateDealActivityDialog() {
    this.toastService.success(
      this.translateService.instant('Common.ComminSoon'),
    );
  }
}
