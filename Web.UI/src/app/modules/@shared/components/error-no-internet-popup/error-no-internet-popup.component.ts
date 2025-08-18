import {
    Component,
    ChangeDetectionStrategy,
    inject,
    effect,
    ChangeDetectorRef,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UpperCasePipe } from '@angular/common';
import { ErrorNoInternetPopupService } from './error-no-internet-popup.service';
import { DialogDirective } from '../../directives/dialog.directive';

@Component({
    selector: 'app-error-no-internet-popup',
    imports: [
        DialogModule,
        TranslatePipe,
        ButtonModule,
        UpperCasePipe,
        DialogDirective,
    ],
    templateUrl: './error-no-internet-popup.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorNoInternetPopupComponent {
    errorNoInternetPopupService = inject(ErrorNoInternetPopupService);
    cdr = inject(ChangeDetectorRef);

    constructor() {
        effect(() => {
            const _ = this.errorNoInternetPopupService.visible();
            this.cdr.markForCheck();
        });
    }
}
