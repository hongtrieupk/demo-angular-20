import { Component, Input, Signal, inject } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { CompanyInfo } from '../../../../core/api-clients/company/models/company-info.model';
import { PanelModule } from 'primeng/panel';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-company-card-important-info',
    templateUrl: './important-info.component.html',
    styleUrl: './important-info.component.scss',
    imports: [PanelModule],
})
export class CompanyCardImportantInfoComponent {
    private getCompanyInfo = inject(ROUTER_OUTLET_DATA) as Signal<CompanyInfo>;
    trustedHtmlInfoContent: SafeHtml;
    constructor(private sanitizer: DomSanitizer) {
        this.trustedHtmlInfoContent = this.sanitizer.bypassSecurityTrustHtml(
            this.getCompanyInfo().comment,
        );
    }
}
