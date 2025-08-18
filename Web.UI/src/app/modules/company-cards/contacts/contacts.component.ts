import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslatePipe } from '@ngx-translate/core';
import { TableComponent } from '../../@shared/components/table/table.component';
import { LoadingService } from '../../@shared/components/spinner/loading.service';
import { CompanyInfo } from '../../../core/api-clients/company/company-info.model';
import { ContactCardView } from '../../../core/api-clients/company/contact-card-view.model';
import { contactColumns } from './table-columns.constant';
import { PagingOptions } from '../../../core/api-clients/pagination.model';
import { mapPrimengSortEnumToSortDirectionEnum } from '../../../core/enums/table.enum';
import { ToastService } from '../../@shared/components/toast/toast.service';
import { CompanyClient } from '../../../core/api-clients/company/company.client';

@Component({
  selector: 'app-company-card-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  imports: [
    PanelModule,
    ButtonModule,
    ToggleSwitchModule,
    FormsModule,
    CheckboxModule,
    TranslatePipe,
    TableComponent,
  ],
})
export class CompanyCardContactComponent {
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService);
  private getCompanyInfo = inject(ROUTER_OUTLET_DATA) as Signal<CompanyInfo>;
  isShowOldContacts = false;
  companyId = '';
  contacts: ContactCardView[] = [];
  contactColumns = contactColumns;
  pagingOptions: PagingOptions = {
    pageSize: 20,
    pageNumber: 1,
  };
  totalRecords = 0;
  getRowClasses = (row: ContactCardView, rowIndex: number) => {
    return {
      'bg-yellow-50': row.isPrimaryContact,
    };
  };

  constructor(private companyClient: CompanyClient) {
    this.companyId = this.getCompanyInfo().customerId;
    this.getContacts();
  }
  pageChange(event: any) {
    this.pagingOptions.pageSize = event.rows;
    this.pagingOptions.pageNumber = event.page + 1;
    this.getContacts();
  }
  pageSort(event: any): void {
    this.pagingOptions.sortDirection = mapPrimengSortEnumToSortDirectionEnum(
      event.order,
    );
    this.pagingOptions.sortField = event.field;
    this.getContacts();
  }
  onToggleShowOldContacts(): void {
    this.getContacts();
  }
  confirmDeleteContact(contact: ContactCardView): void {
    this.toastService.success('TODO: delete a contact');
  }
  showEditContactDialog(contact: ContactCardView): void {
    this.toastService.success('TODO: show edit a contact dialog');
  }

  showCreateContactDialog() {
    this.toastService.success('TODO: show create a contact dialog');
  }

  private getContacts(): void {
    this.loadingService.show();
    this.companyClient
      .getContacts(this.companyId, this.isShowOldContacts, this.pagingOptions)
      .subscribe({
        next: (result) => {
          this.contacts = result.items;
          this.totalRecords = result.totalItemCount;
          this.loadingService.hide();
        },
        error: () => {
          this.loadingService.hide();
        },
      });
  }
}
