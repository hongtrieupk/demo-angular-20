import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, map, Observable, of } from 'rxjs';

@Pipe({ name: 'translateCustom', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(keys: string[] | string): Observable<string> {
        if (!keys) return of('');

        if (Array.isArray(keys)) {
            const translations$ = keys.map((key) => this.translate.get(key));

            return forkJoin(translations$).pipe(
                map((results: string[]) => results.join(' ')),
            );
        }

        return this.translate.get(keys);
    }
}
