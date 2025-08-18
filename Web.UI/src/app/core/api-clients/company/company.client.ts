import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CompanyInfo } from './company-info.model';
import { ContactCardView } from './contact-card-view.model';
import { PaginationResult, PagingOptions } from '../pagination.model';
import { ActivityCardView } from './activity-card-view.model';
import { DealActivityTypesEnum } from '../../enums/deal-activity-types.enum';

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
}
