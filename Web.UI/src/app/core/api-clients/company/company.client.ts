import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CompanyInfo } from './company-info.model';
import { ContactCardView } from './contact-card-view.model';
import { PaginationResult, PagingOptions } from '../pagination.model';
import { ActivityCardView } from './activity-card-view.model';
import { DealActivityTypesEnum } from '../../enums/deal-activity-types.enum';
import { WorkOrderCardView } from './work-order-card-view.model';
import { UpSellingCardView } from './upselling-card-view.model';
import { DealCardView } from './deal-card-view.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyClient {
  private httpClient = inject(HttpClient);

  getById(id: string): Observable<CompanyInfo> {
    const mockCompanyInfos: CompanyInfo = {
      customerId: '6489930d-9caa-420a-b096-f1602e771e45',
      name: 'ABC Custard',
      comment:
        '<i><u></u></i>Alle innkjøp skal avtales med<br><b style="color: #e26a6a">Test</b><br>',
    } as CompanyInfo;
    return of(mockCompanyInfos);
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
    // const url = `companies/contacts`;
    // return this.httpClient.get<PaginationResult<ContactCardView>>(url, {
    //   params: {
    //     companyId,
    //     inactiveOnly,
    //     ...pagingOption,
    //   },
    // });
    const mockResults: PaginationResult<ContactCardView> = {
      items: [
        {
          customerPersonId: '6f6b6e9f-3bf3-4a7f-b9f6-feeb842a2046',
          customerId: '6489930d-9caa-420a-b096-f1602e771e45',
          firstName: 'Loki',
          lastName: 'Loki',
          email: 'tina.testerabc@.onmicrosoft.com',
          smsAlert: false,
          infoEmail: true,
          isAdmin: true,
          inactive: false,
        } as ContactCardView,
        {
          customerPersonId: '66348d93-7e4d-4faf-8c64-bce13a52ddf7',
          customerId: '6489930d-9caa-420a-b096-f1602e771e45',
          firstName: 'Phong',
          lastName: 'Man',
          email: 'phong.mantran@abc.com',
          tags: 'test1',
          phone: '+6554617617',
          smsAlert: false,
          infoEmail: false,
          inactive: false,
          isPrimaryContact: true,
        } as ContactCardView,
      ],
      totalItemCount: 2,
      totalPages: 1,
    };
    return of(mockResults);
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
