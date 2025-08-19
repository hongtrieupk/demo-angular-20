import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-companies',
  imports: [
    TranslatePipe,
  ],
  templateUrl: './companies.html',
  styleUrl: './companies.scss'
})
export class Companies {

}
