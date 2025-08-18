import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Error5xxService } from './error-5xx.service';
import { UpperCasePipe } from '@angular/common';
import { DialogDirective } from '../../../directives/dialog.directive';

@Component({
    selector: 'app-error-5xx',
    imports: [
        DialogModule,
        TranslatePipe,
        ButtonModule,
        UpperCasePipe,
        DialogDirective,
    ],
    templateUrl: './error-5xx.component.html',
    styleUrl: './error-5xx.component.scss',
})
export class Error5xxComponent {
    error5xxService = inject(Error5xxService);
}
