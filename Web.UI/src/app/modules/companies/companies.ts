import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TableComponent } from '../@shared/components/table/table.component';
import { CompanyOveralInfo } from '../../core/api-clients/company/models/company-overal-info.model';
import { companyColumns } from './table-columns.constant';
import { PagingOptions } from '../../core/api-clients/pagination.model';
import { LoadingService } from '../@shared/components/spinner/loading.service';
import { CompanyClient } from '../../core/api-clients/company/company.client';

@Component({
  selector: 'app-companies',
  imports: [TranslatePipe, TableComponent],
  templateUrl: './companies.html',
  styleUrl: './companies.scss',
})
export class Companies {
  private loadingService = inject(LoadingService);
  private companyClient = inject(CompanyClient);
  companies: CompanyOveralInfo[] = [];
  columns = companyColumns;
  pagingOptions: PagingOptions = {
    pageSize: 20,
    pageNumber: 1,
  };
  totalRecords = 0;
  constructor() {
    this.getCompanies();
  }
  pageChange(event: any) {
    this.pagingOptions.pageSize = event.rows;
    this.pagingOptions.pageNumber = event.page + 1;
    this.getCompanies();
  }
  pageSort(event: any): void {
    this.pagingOptions.sortField = event.field;
    this.getCompanies();
  }
  private getCompanies(): void {
    this.loadingService.show();
    this.companyClient.getCompanies(this.pagingOptions).subscribe({
      next: (result) => {
        this.companies = result.items;
        this.totalRecords = result.totalItemCount;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      },
    });
  }
}
