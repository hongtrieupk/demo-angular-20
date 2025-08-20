import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { createMultiTranslateLoader } from './core/i18n';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipeConfig } from '@angular/common';
import { apiResponseHttpInterceptor } from './interceptors/api-response.interceptor';
import { apiHttpInterceptor } from './interceptors/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createMultiTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ]),
    MessageService,
    provideHttpClient(
      withFetch(),
      withInterceptors([apiHttpInterceptor, apiResponseHttpInterceptor]),
    ),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } },
    }),
    TranslatePipe,
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useFactory: (): DatePipeConfig & { dateTimeFormat?: string } => {
        const translateService = inject(TranslateService);
        const getDatePipeConfig = () => {
          const language = translateService.currentLang;
          if (language === 'other') {
            return {
              dateFormat: 'dd.MM.yyyy',
              dateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
            };
          }
          return {
            dateFormat: 'MM/dd/yyyy',
            dateTimeFormat: 'MM/dd/yyyy HH:mm:ss',
          };
        };

        const currentConfig = getDatePipeConfig();
        const configProxy = new Proxy(currentConfig, {
          get(_, prop) {
            return currentConfig[prop as keyof typeof currentConfig];
          },
          set(_, prop, value) {
            currentConfig[prop as keyof typeof currentConfig] = value;
            return true;
          },
        });

        // Update on language change
        translateService.onLangChange.subscribe(() => {
          const newConfig = getDatePipeConfig();
          Object.assign(configProxy, newConfig);
        });

        return configProxy;
      },
    },
  ],
};
