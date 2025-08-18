import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyInfo } from '../../core/api-clients/company/company-info.model';

@UntilDestroy()
@Component({
  selector: 'app-company-cards',
  templateUrl: 'company-cards.component.html',
  styleUrls: ['company-cards.component.scss'],
  imports: [CommonModule, TabsModule, TranslateModule, RouterModule],
})
export class CompanyCardsComponent {
  companyInfo = {} as CompanyInfo;
  tabs = [
    {
      routerLink: 'important-info',
      title: 'CompanyTabs.ImportantInfo',
      icon: 'pi pi-info-circle',
    },
    {
      routerLink: 'contacts',
      title: 'CompanyTabs.Contacts',
      icon: 'pi pi-id-card',
    },
    {
      routerLink: 'activities',
      title: 'CompanyTabs.Activities',
      icon: 'pi pi-wave-pulse',
    },
    {
      routerLink: 'sales',
      title: 'CompanyTabs.Sales',
      icon: 'pi pi-wallet',
    },
    {
      routerLink: 'marketing',
      title: 'CompanyTabs.Marketing',
      icon: 'pi pi-dollar',
    },
    {
      routerLink: 'hour-and-project',
      title: 'CompanyTabs.HourAndProject',
      icon: 'pi pi-clock',
    },
    {
      routerLink: 'services',
      title: 'CompanyTabs.Services',
      icon: 'pi pi-wrench',
    },
    {
      routerLink: 'equipment',
      title: 'CompanyTabs.Equipment',
      icon: 'pi pi-briefcase',
    },
  ];

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.companyInfo = data['pageData'];
    });
  }
}
