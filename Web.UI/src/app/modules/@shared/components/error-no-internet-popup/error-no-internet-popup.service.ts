import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ErrorNoInternetPopupService {
    visible = signal(false);

    show() {
        this.visible.set(true);
    }

    hide() {
        this.visible.set(false);
    }
}
