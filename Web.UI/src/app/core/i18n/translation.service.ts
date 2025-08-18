import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale {
    lang: string;
    data: any;
}

export const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
    providedIn: 'root',
})
export class TranslationService {
    // Private properties
    private langIds: any = ['en', 'no'];

    constructor(private translate: TranslateService) {
        // add new langIds to the list
        this.translate.addLangs(['en']);

        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
    }

    loadTranslations(): void {
        // add new languages to the list
        this.translate.addLangs(this.langIds);
        this.translate.use(this.getSelectedLanguage());
    }

    setLanguage(lang: string): void {
        if (!lang) {
            return;
        }

        this.translate.use(this.translate.getDefaultLang());
        this.translate.use(lang);
        localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    }

    /**
     * Returns selected language
     */
    getSelectedLanguage(): any {
        return (
            localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) ||
            this.translate.getDefaultLang()
        );
    }

    isEnglish(): boolean {
        const isEng = this.getSelectedLanguage() === 'en';
        return isEng;
    }
}
