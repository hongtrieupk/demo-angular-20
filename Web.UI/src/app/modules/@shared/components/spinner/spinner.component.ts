import { Component, inject } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';
import { LoadingService } from './loading.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-spinner',
    imports: [CommonModule, ProgressSpinner],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
})
export class ProcessingSpinnerComponent {
    loadingService = inject(LoadingService);
}
