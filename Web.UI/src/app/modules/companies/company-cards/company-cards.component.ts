import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { getCompanyClassImageSrc, TABS } from './constant';
import { NetPromoterScoreComponent } from './net-promoter-score/net-promoter-score.component';
import { CompanyInfo } from '../../../core/api-clients/company/company-info.model';

@UntilDestroy()
@Component({
    selector: 'app-company-cards',
    templateUrl: 'company-cards.component.html',
    styleUrls: ['company-cards.component.scss'],
    imports: [
        CommonModule,
        TabsModule,
        TranslateModule,
        RouterModule,
        DialogModule,
        ButtonModule,
        NetPromoterScoreComponent,
    ],
})
export class CompanyCardsComponent {
    companyInfo = new CompanyInfo();
    tabs = TABS;
    selectedTab = 'important-info';
    visibleImportantInfoDialog = false;
    visibleNetPromoterScoreDialog = false;

    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {}
    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.companyInfo = data['pageData'];
        });
        this.selectedTab = this.parseSelectedTab(this.route);
    }
    bypassSecurityTrustHtml(rawHtml: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(rawHtml);
    }

    getCompanyClassImageSrc(): string {
        return getCompanyClassImageSrc(
            this.companyInfo.companyNetPromoterScore,
        );
    }

    private parseSelectedTab(route: ActivatedRoute): string {
        const childUrlSegments = this.route.firstChild?.snapshot.url;
        if (!childUrlSegments || childUrlSegments.length < 1) {
            return this.selectedTab;
        }
        return childUrlSegments[0].path;
    }
}
