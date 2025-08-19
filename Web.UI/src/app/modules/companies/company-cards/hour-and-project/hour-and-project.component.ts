import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-company-card-hour-and-project',
    templateUrl: './hour-and-project.component.html',
    styleUrl: './hour-and-project.component.scss',
      imports: [TranslatePipe],
})
export class CompanyCardHourAndProjectComponent {}
