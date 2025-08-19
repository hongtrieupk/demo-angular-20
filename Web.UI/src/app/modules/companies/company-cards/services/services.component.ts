import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-company-card-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  imports: [TranslatePipe],
})
export class CompanyCardServicesComponent {}
