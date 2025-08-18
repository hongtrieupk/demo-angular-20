import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CompanyInfo } from './company-info.model';
import { ContactCardView } from './contact-card-view.model';
import { PaginationResult, PagingOptions } from '../pagination.model';

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
}
