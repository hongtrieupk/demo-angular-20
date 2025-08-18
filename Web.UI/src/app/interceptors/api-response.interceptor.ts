import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { apiInterceptorConfigToken } from './http-context';
import { Injector } from '@angular/core';
import { Error5xxService } from '../modules/@shared/components/errors/error-5xx/error-5xx.service';
import { ErrorNoInternetPopupService } from '../modules/@shared/components/error-no-internet-popup/error-no-internet-popup.service';
import { ToastService } from '../modules/@shared/components/toast/toast.service';

export const apiResponseHttpInterceptor: HttpInterceptorFn = (req, next) => {
    const injector = inject(Injector);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const error5xxService = injector.get(Error5xxService);
            const errorNoInternetPopupService = injector.get(
                ErrorNoInternetPopupService,
            );
            const toastService = injector.get(ToastService);
            const apiInterceptorConfig = req.context.get(
                apiInterceptorConfigToken,
            );

            if (error.status === 0) {
                errorNoInternetPopupService.show();
            } else if (error.status >= 500) {
                error5xxService.show();
            } else {
                if (apiInterceptorConfig.showResponseErrorAsToast) {
                    toastService.error(error.message);
                }
            }

            return throwError(() => error);
        }),
    );
};
