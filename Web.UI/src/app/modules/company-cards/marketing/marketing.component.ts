import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-company-card-marketing',
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss',
  imports: [TranslatePipe],
})
export class CompanyCardMarketingComponent {}
