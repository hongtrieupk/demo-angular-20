import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-company-card-equipment',
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss',
  imports: [TranslatePipe],
})
export class CompanyCardEquipmentComponent {}
