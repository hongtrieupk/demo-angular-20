import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CompanyInfo } from '../../../core/api-clients/company/company-info.model';
import { CompanyClient } from '../../../core/api-clients/company/company.client';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyCardsResolver {
  private companyClient = inject(CompanyClient);
  resolve(route: ActivatedRouteSnapshot): Observable<CompanyInfo> {
    const companyId = route.params['id'];
    return this.companyClient.getById(companyId);
  }
}
