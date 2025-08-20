import { Component, inject, Signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { workOrderColumns } from './table-columns.constant';
import { TableComponent } from '../../../@shared/components/table/table.component';
import { WorkOrderStatusEnum } from '../../../../core/enums/work-order-status.enum';
import { CompanyClient } from '../../../../core/api-clients/company/company.client';
import { SelectOption } from '../../../../core/api-clients/select-option';
import { PagingOptions } from '../../../../core/api-clients/pagination.model';
import { WorkOrderCardView } from '../../../../core/api-clients/company/models/work-order-card-view.model';
import { CompanyInfo } from '../../../../core/api-clients/company/models/company-info.model';
import { DATE_FORMAT } from '../../../../core/enums/table.enum';

@Component({
  selector: 'app-company-card-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrl: './work-orders.component.scss',
  imports: [
    ButtonModule,
    SelectModule,
    TableComponent,
    InputTextModule,
    MultiSelectModule,
    FormsModule,
    CheckboxModule,
    DatePickerModule,
    TranslatePipe,
  ],
  providers: [DatePipe],
})
export class CompanyCardWorkOrdersComponent {
  private getCompanyInfo = inject(ROUTER_OUTLET_DATA) as Signal<CompanyInfo>;
  private companyClient = inject(CompanyClient);
  private datePipe = inject(DatePipe);
  companyId = this.getCompanyInfo().id;
  workOrderColumns = workOrderColumns;
  statusOptions = [
    { label: 'Not started', value: 1 },
    { label: 'In progress', value: 2 },
    { label: 'On hold', value: 3 },
    { label: 'Done', value: 4 },
    { label: 'Waiting 3 party', value: 5 },
    { label: 'Cancelled', value: 6 },
  ];
  mainTypeOptions = [
    { label: 'Customer request', value: 2 },
    { label: 'Work Order', value: 1 },
    { label: 'WorkShop', value: 3 },
    { label: 'Service Delivery', value: 4 },
  ];
  selectedStatuses: SelectOption[] = [];
  defaultSelectStatusIds = [
    WorkOrderStatusEnum.Notstarted,
    WorkOrderStatusEnum.InProgress,
    WorkOrderStatusEnum.OnHold,
    WorkOrderStatusEnum.Waiting3Party,
  ];
  selectedMainType: SelectOption = { label: '', value: '' };
  freetext = '';
  includeHandledAsInternal = false;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  workOrders: WorkOrderCardView[] = [];
  pagingOptions: PagingOptions = {
    pageSize: 20,
    pageNumber: 1,
  };
  totalRecords = 0;
  constructor() {
    this.getWorkOrders();
  }
  navigateToEditWorkOrderPage(workOrder: WorkOrderCardView): void {
    const url = `/WorkOrder/Edit?WorkOrderId=${workOrder.workOrderId}&defaultTab=2`;
    window.open(url);
  }
  onClickSearch(): void {
    this.getWorkOrders();
  }
  pageSort(event: any): void {
    this.pagingOptions.sortDirection = event.order;
    this.pagingOptions.sortField = event.field;
    this.getWorkOrders();
  }
  pageChange(event: any) {
    this.pagingOptions.pageSize = event.rows;
    this.pagingOptions.pageNumber = event.page + 1;
    this.getWorkOrders();
  }
  getWorkOrders(): void {
    const statuses = this.selectedStatuses.map((x) => x.value).join(',');
    this.companyClient
      .searchWorkOrders(
        this.companyId,
        this.freetext,
        statuses,
        this.selectedMainType.value,
        this.datePipe.transform(this.fromDate, DATE_FORMAT) ?? '',
        this.datePipe.transform(this.toDate, DATE_FORMAT) ?? '',
        this.pagingOptions,
      )
      .subscribe((result) => {
        this.workOrders = result.items;
        this.totalRecords = result.totalItemCount;
      });
  }
}
