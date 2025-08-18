import { HttpContextToken } from '@angular/common/http';

export interface ApiInterceptorConfig {
  showResponseErrorAsToast?: boolean;
}

export const apiInterceptorConfigToken =
  new HttpContextToken<ApiInterceptorConfig>(() => ({
    showResponseErrorAsToast: true,
  }));
