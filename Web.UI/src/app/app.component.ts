import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/i18n';
import { LoadingService } from './modules/@shared/components/spinner/loading.service';
import { ToastComponent } from './modules/@shared/components/toast/toast.component';
import { ErrorNoInternetPopupComponent } from './modules/@shared/components/error-no-internet-popup/error-no-internet-popup.component';
import { Error5xxComponent } from './modules/@shared/components/errors/error-5xx/error-5xx.component';
import { ProcessingSpinnerComponent } from './modules/@shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToastComponent,
    ProcessingSpinnerComponent,
    Error5xxComponent,
    ErrorNoInternetPopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'million-demo';
  translationService = inject(TranslationService);
  loadingService = inject(LoadingService);
  ngOnInit(): void {
    this.loadingService.show(null, true);
    this.translationService.loadTranslations().subscribe(() => {
      this.loadingService.hide();
    });
  }
}
