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
import { isEmptyGuid } from '../../../../core/ultis/string-utils';
import { DealActivityTypesEnum } from '../../../../core/enums/deal-activity-types.enum';
import { PagingOptions } from '../../../../core/api-clients/pagination.model';
import { ActivityCardView } from '../../../../core/api-clients/company/models/activity-card-view.model';
import { CompanyInfo } from '../../../../core/api-clients/company/models/company-info.model';
import { CompanyClient } from '../../../../core/api-clients/company/company.client';
import { Subscription } from 'rxjs';

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
  private toastService = inject(ToastService);
  private translateService = inject(TranslateService);
  private subscription = new Subscription();
  getCompanyInfo = inject(ROUTER_OUTLET_DATA) as Signal<CompanyInfo>;
  companyId = this.getCompanyInfo().id;
  customerPrimaryContactId = this.getCompanyInfo().companyPrimaryContactId;
  isShowAll = true;
  activities: ActivityCardView[] = [];
  activitiesColumns = activitiesColumns;
  pagingOptions: PagingOptions = {
    pageSize: 20,
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
    if (activity.activityTypeId === DealActivityTypesEnum.Note) {
      this.showEditDealActivityNoteDialog(activity);
    } else {
      this.showEditDealActivityDialog(activity);
    }
  }
  private showEditDealActivityNoteDialog(activity: ActivityCardView) {
    this.toastService.success(
      this.translateService.instant('Common.ComminSoon'),
    );
  }

  getSaleDealActivityUrl(activity: ActivityCardView): string {
    return `/Deal/LeadActivities?dealId=${activity.dealId}`;
  }
  getEditDealUrl(activity: ActivityCardView): string {
    return `/Deal/EditDeal?dealId=${activity.dealId}`;
  }
  pageChange(event: any) {
    this.pagingOptions.pageSize = event.rows;
    this.pagingOptions.pageNumber = event.page + 1;
    this.getActivities();
  }

  private getActivities(): void {
    const activities$ = this.isShowAll
      ? this.companyClient.getActivities(this.companyId, this.pagingOptions)
      : this.companyClient.getLatestActivities(
          this.companyId,
          this.pagingOptions,
        );
    this.subscription = activities$.subscribe((result) => {
      this.activities = result.items;
      this.totalRecords = result.totalItemCount;
      this.subscription.unsubscribe();
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

  showEditDealActivityDialog(dealActivity: ActivityCardView) {
    this.toastService.success(
      this.translateService.instant('Common.ComminSoon'),
    );
  }
}
