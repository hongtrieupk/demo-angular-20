import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CompanyInfo } from '../../core/api-clients/company/company-info.model';

@Injectable()
export class CompanyCardsResolver {
    constructor(/*private companyClient: CompanyClient*/) {}
    mockCompanyInfos: CompanyInfo[] = [
        {
            id: '6489930d-9caa-420a-b096-f1602e771e45',
            name: 'ABC Custard',
            importantInfo:
                '<i><u></u></i>Alle innkjøp skal avtales med<br><b style="color: #e26a6a">Test</b><br>',
        },
    ];
    async resolve(
        route: ActivatedRouteSnapshot,
    ): Promise<CompanyInfo | undefined> {
        const companyId = route.params['id'];
        const companyInfo = this.mockCompanyInfos.find(
            (x) => x.id === companyId,
        );
        return companyInfo;
    }
}
