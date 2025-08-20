import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private messageService = inject(MessageService);
    private translateService = inject(TranslateService);

    success(message: string) {
        this.messageService.add({
            severity: 'success',
            summary: message,
        });
    }

    successWithI18n(messageKey: string, ...args: any[]) {
        this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant(messageKey, ...args),
        });
    }

    error(message: string) {
        this.messageService.add({
            severity: 'error',
            summary: message,
        });
    }

    errorWithI18n(messageKey: string, ...args: any[]) {
        this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant(messageKey, ...args),
        });
    }

    add(toast: ToastMessageOptions) {
        this.messageService.add(toast);
    }

    addAll(toasts: ToastMessageOptions[]) {
        this.messageService.addAll(toasts);
    }
}
