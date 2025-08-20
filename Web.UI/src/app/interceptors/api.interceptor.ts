import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const apiHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authenToken = 'generete_after_login';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${authenToken}`,
  });

  const cloneRequest = req.clone({
    url: `${environment.webApiBaseUrl}/${req.url}`,
    headers,
  });

  return next(cloneRequest);
};
