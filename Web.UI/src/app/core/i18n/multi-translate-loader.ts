import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

export function createMultiTranslateLoader(
    http: HttpClient,
): MultiTranslateHttpLoader {
    return new MultiTranslateHttpLoader(http);
}

class MultiTranslateHttpLoader implements TranslateLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string): Observable<any> {
        const modules = ['', 'company.', 'common.', 'work-order.'];
        const fetchPromises = modules.map((module) =>
            this.getTranslations(`./i18n/${module}${lang}.json`),
        );

        return from(
            Promise.all(fetchPromises).then((responses: any[]) => {
                // Combine all the loaded translation files into a single object
                const combinedTranslations = {};
                responses.forEach((response) => {
                    Object.assign(combinedTranslations, response);
                });
                return combinedTranslations;
            }),
        );
    }

    private getTranslations(url: string): Promise<any> {
        return fetch(url)
            .then((response) => response.json())
            .catch((err) => {
                console.error(`Error loading translation file: ${url}`, err);
                return {};
            });
    }
}
