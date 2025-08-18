import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-toast',
    imports: [Toast, RippleModule],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {}
