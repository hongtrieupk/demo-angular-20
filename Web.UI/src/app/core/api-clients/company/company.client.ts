import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CompanyInfo } from './models/company-info.model';
import { ContactCardView } from './models/contact-card-view.model';
import { PaginationResult, PagingOptions } from '../pagination.model';
import { ActivityCardView } from './models/activity-card-view.model';
import { DealActivityTypesEnum } from '../../enums/deal-activity-types.enum';
import { WorkOrderCardView } from './models/work-order-card-view.model';
import { UpSellingCardView } from './models/upselling-card-view.model';
import { DealCardView } from './models/deal-card-view.model';
import { CompanyOveralInfo } from './models/company-overal-info.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyClient {
  private httpClient = inject(HttpClient);
  getCompanies(
    companyName: string,
    pagingOption: PagingOptions,
  ): Observable<PaginationResult<CompanyOveralInfo>> {
    const url = `companies`;
    return this.httpClient.get<PaginationResult<CompanyOveralInfo>>(url, {
      params: {
        name: companyName,
        ...pagingOption,
      },
    });
  }

  getById(id: string): Observable<CompanyInfo> {
    const url = `companies/${id}`;
    return this.httpClient.get<CompanyInfo>(url);
  }
  searchWorkOrders(
    companyId: string,
    freetext: string,
    statuses: string,
    mainType: string | number,
    fromDate: string,
    toDate: string,
    pagingOption: PagingOptions,
  ): Observable<PaginationResult<WorkOrderCardView>> {
    //  const url = `companies/${companyId}/work-orders`;
    //         return this.httpClient.get<PaginationResult<WorkOrderCardView>>(url, {
    //             params: {
    //                 freetext,
    //                 statuses,
    //                 mainType,
    //                 fromDate,
    //                 toDate,
    //                 ...pagingOption,
    //             },
    //         });
    return of({
      items: [
        {
          workOrderId: '90f46726-0b0c-4cee-a486-b6e26c66bde7',
          workOrderNumber: '001231',
          title:
            'Undeliverable: Work ordre tildelt hos: Nguyen Company_NOK currency ',
          createdDate: '07/31/2023',
          dateString: '08/05/2023',
          dueTimeDisplay: '00:12',
          startDate: '08/09/2023',
          taskTypeName: 'Change request',
          mainTypeName: 'Customer Request',
          priority: 'C',
          category: 'Gruppe Servicedesk',
          recurrenceTypeName: 'Daily',
          estimatedHours: 8.0,
          isDoneByServiceDesk: true,
          fixedStatusString: 'Not Started	',
          personName: 'Phuong Nguyen',
          customerName: 'Loki Loki	',
          age: '705',
          daysSinceLastUpdate: '558',
          lastUpdatedByName: 'khaoco tester	',
          lastUpdatedDate: '06/04/2025',
        },
      ],
    } as PaginationResult<WorkOrderCardView>);
  }
  getContacts(
    companyId: string,
    inactiveOnly: boolean,
    pagingOption: PagingOptions,
  ): Observable<PaginationResult<ContactCardView>> {
    const url = `companies/${companyId}/contacts`;
    return this.httpClient.get<PaginationResult<ContactCardView>>(url, {
      params: {
        inactiveOnly,
        ...pagingOption,
      },
    });
  }
  getActivities(
    companyId: string,
    pagingOption: PagingOptions,
  ): Observable<PaginationResult<ActivityCardView>> {
    return of({
      items: this.mockAllActivities(),
      totalItemCount: 2,
      totalPages: 1,
    });
    // const url = `companies/${companyId}/activities`;
    // return this.httpClient.get<PaginationResult<ActivityCardView>>(url, {
    //   params: {
    //     ...pagingOption,
    //   },
    // });
  }

  getLatestActivities(
    companyId: string,
    pagingOption: PagingOptions,
  ): Observable<PaginationResult<ActivityCardView>> {
    return of({
      items: this.mockTop10Activities(),
      totalItemCount: 2,
      totalPages: 1,
    });
    // const url = `companies/${companyId}/activities/latest`;
    // return this.httpClient.get<PaginationResult<ActivityCardView>>(url, {
    //   params: {
    //     ...pagingOption,
    //   },
    // });
  }
  getUpsellings(
    companyId: string,
    pagingOption: PagingOptions,
  ): Observable<PaginationResult<UpSellingCardView>> {
    // const url = `companies/${companyId}/upsellings`;
    // return this.httpClient.get<PaginationResult<UpSellingCardView>>(url, {
    //     params: {
    //         ...pagingOption,
    //     },
    // });
    return of({
      items: this.mockUpSellings(),
      totalItemCount: 2,
      totalPages: 1,
    });
  }

  getInactiveDeals(
    companyId: string,
    includeDeleted: boolean,
    pagingOption: PagingOptions,
  ): Observable<PaginationResult<DealCardView>> {
    // const url = `companies/${companyId}/inactive-deals`;
    // return this.httpClient.get<PaginationResult<DealCardView>>(url, {
    //     params: {
    //         includeDeleted,
    //         ...pagingOption,
    //     },
    // });
    return of({
      items: this.mockAllDeals(),
      totalItemCount: 2,
      totalPages: 1,
    });
  }

  getLatestDeals(
    companyId: string,
    includeDeleted: boolean,
    pagingOption: PagingOptions,
  ): Observable<PaginationResult<DealCardView>> {
    // const url = `companies/${companyId}/deals/latest`;
    // return this.httpClient.get<PaginationResult<DealCardView>>(url, {
    //   params: {
    //     includeDeleted,
    //     ...pagingOption,
    //   },
    // });
    return of({
      items: this.mockAllDeals(),
      totalItemCount: 2,
      totalPages: 1,
    });
  }
  mockAllActivities(): ActivityCardView[] {
    return [
      {
        activityId: '',
        date: '2024-01-26T15:39:00Z',
        activityTypeId: DealActivityTypesEnum.Call,
        activityType: 'Call',
        title: 'SSE test',
        customerPersonName: 'Phong Man',
        assignedName: 'Phuong Nguyen',
        status: 'Open',
      },
      {
        activityId: '',
        date: '2023-08-02T13:23:53.02Z',
        activityTypeId: DealActivityTypesEnum.Email,
        activityType: 'Call',
        title: 'SSE test',
        customerPersonName: 'Pakkun Pakkun',
        assignedName: 'Jiraja Shanin',
        status: 'Done',
      },
      {
        activityId: '',
        date: '2023-08-02T13:23:53.02Z',
        activityTypeId: DealActivityTypesEnum.Upload,
        activityType: 'Upload',
        title: 'SSE test',
        customerPersonName: 'Pakkun Pakkun',
        assignedName: 'Jiraja Shanin',
        status: 'Done',
      },
      {
        activityId: '',
        date: '2023-08-02T13:23:53.02Z',
        activityTypeId: DealActivityTypesEnum.Email,
        activityType: 'Call',
        title: 'SSE test',
        customerPersonName: 'Pakkun Pakkun',
        assignedName: 'Jiraja Shanin',
        status: 'Done',
      },
      {
        activityId: '',
        date: '2023-08-02T13:23:53.02Z',
        activityTypeId: DealActivityTypesEnum.Email,
        activityType: 'Call',
        title: 'SSE test',
        customerPersonName: 'Pakkun Pakkun',
        assignedName: 'Jiraja Shanin',
        status: 'Done',
      },
    ] as ActivityCardView[];
  }
  mockTop10Activities(): ActivityCardView[] {
    return [
      {
        activityId: '',
        date: '2024-01-26T15:39:00Z',
        activityTypeId: DealActivityTypesEnum.Call,
        activityType: 'Call',
        title: 'Top 10 test 1',
        customerPersonName: 'Phong Man',
        assignedName: 'Phuong Nguyen',
        status: 'Open',
      },
      {
        activityId: '',
        date: '2023-08-02T13:23:53.02Z',
        activityTypeId: DealActivityTypesEnum.Email,
        activityType: 'Call',
        title: 'Top 10 test 2',
        customerPersonName: 'Pakkun Pakkun',
        assignedName: 'Jiraja Shanin',
        status: 'Done',
      },
      {
        activityId: '',
        date: '2023-08-02T13:23:53.02Z',
        activityTypeId: DealActivityTypesEnum.Upload,
        activityType: 'Upload',
        title: 'Top 10 test 1 3',
        customerPersonName: 'Pakkun Pakkun',
        assignedName: 'Jiraja Shanin',
        status: 'Done',
      },
    ] as ActivityCardView[];
  }

  mockAllDeals(): DealCardView[] {
    return [
      {
        dealId: '7caf8ce7-ded6-4898-8fa7-53513c9bdbd3',
        dealNumber: 322,
        title: 'ABC Custard Deal',
        responsiblePersonName: 'Admin, System',
        categoryName: 'Mersalg',
        stageName: 'Forhandling',
        leadFromName: 'Anbefalt',
        totalPrice: 40005.21,
        status: 'Won',
        wonDate: '2023-11-23T08:10:16.997Z',
        isRenegotiation: false,
      },
      {
        dealId: '7caf8ce7-ded6-4898-8fa7-53513c9bdbd3',
        dealNumber: 322,
        title: 'TT test deal with auto create d SO/project - 01',
        responsiblePersonName: 'Admin, System',
        categoryName: 'Mersalg',
        stageName: 'Forhandling',
        leadFromName: 'Anbefalt',
        totalPrice: 40005.21,
        status: 'Won',
        wonDate: '2023-11-23T08:10:16.997Z',
        isRenegotiation: false,
      },
      {
        dealId: '7caf8ce7-ded6-4898-8fa7-53513c9bdbd3',
        dealNumber: 322,
        title: 'Việt Nam chân gà hội',
        responsiblePersonName: 'Admin, System',
        categoryName: 'Mersalg',
        stageName: 'Forhandling',
        leadFromName: 'Anbefalt',
        totalPrice: 40005.21,
        status: 'Won',
        wonDate: '2023-11-23T08:10:16.997Z',
        isRenegotiation: false,
      },
      {
        dealId: '7caf8ce7-ded6-4898-8fa7-53513c9bdbd3',
        dealNumber: 322,
        title:
          'PN responsible 100% - Renegotiation 3,600 -> 3,000 - shared by PN 40% and 2 other persons',
        responsiblePersonName: 'Admin, System',
        categoryName: 'Mersalg',
        stageName: 'Forhandling',
        leadFromName: 'Anbefalt',
        totalPrice: 40005.21,
        status: 'Won',
        wonDate: '2023-11-23T08:10:16.997Z',
        isRenegotiation: false,
      },
    ];
  }
  mockTop10Deals(): DealCardView[] {
    return [
      {
        dealId: '7caf8ce7-ded6-4898-8fa7-53513c9bdbd3',
        dealNumber: 322,
        title: 'ABC Custard Deal',
        responsiblePersonName: 'Top 10',
        categoryName: 'Mersalg',
        stageName: 'Forhandling',
        leadFromName: 'Anbefalt',
        totalPrice: 40005.21,
        status: 'Won',
        wonDate: '2023-11-23T08:10:16.997Z',
        isRenegotiation: false,
      },
      {
        dealId: '7caf8ce7-ded6-4898-8fa7-53513c9bdbd3',
        dealNumber: 322,
        title: 'TT test deal with auto create d SO/project - 01',
        responsiblePersonName: 'Top 10',
        categoryName: 'Mersalg',
        stageName: 'Forhandling',
        leadFromName: 'Anbefalt',
        totalPrice: 40005.21,
        status: 'Won',
        wonDate: '2023-11-23T08:10:16.997Z',
        isRenegotiation: false,
      },
      {
        dealId: '7caf8ce7-ded6-4898-8fa7-53513c9bdbd3',
        dealNumber: 322,
        title: 'Việt Nam chân gà hội',
        responsiblePersonName: 'Top 10',
        categoryName: 'Mersalg',
        stageName: 'Forhandling',
        leadFromName: 'Anbefalt',
        totalPrice: 40005.21,
        status: 'Won',
        wonDate: '2023-11-23T08:10:16.997Z',
        isRenegotiation: false,
      },
      {
        dealId: '7caf8ce7-ded6-4898-8fa7-53513c9bdbd3',
        dealNumber: 322,
        title:
          'PN responsible 100% - Renegotiation 3,600 -> 3,000 - shared by PN 40% and 2 other persons',
        responsiblePersonName: 'Admin, System',
        categoryName: 'Mersalg',
        stageName: 'Forhandling',
        leadFromName: 'Anbefalt',
        totalPrice: 40005.21,
        status: 'Won',
        wonDate: '2023-11-23T08:10:16.997Z',
        isRenegotiation: false,
      },
    ];
  }

  mockUpSellings(): UpSellingCardView[] {
    return [
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
      {
        activeDeal: true,
        articleNo: '',
        agreementDetailId: '',
        comment: 'yamaha why not?',
        customerId: '',
        dealExpectedCloseDate: '2024-01-26T09:39:29.393Z',
        dealId: '',
        dealResponsiblePersonName: 'Millie Brown Bobby',
        inUse: false,
        minimumAgreePeriodName: 'minimum Agree Period',
        productGroupNumber: '4',
        relevant: false,
        serviceTypeName: 'Antivirus_Spam',
        upsellingId: '',
      },
    ];
  }
}
