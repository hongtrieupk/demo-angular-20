import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    loading = false;
    message?: string | null;
    isOpaque = false;
    show(message?: string | null, isOpaque?: boolean) {
        this.loading = true;
        this.message = message;
        this.isOpaque = isOpaque ?? false;
    }

    hide() {
        this.loading = false;
        this.message = null;
        this.isOpaque = false;
    }
}
