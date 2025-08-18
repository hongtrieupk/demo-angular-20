import {
  ChangeDetectorRef,
  Directive,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { TranslateService, _ } from '@ngx-translate/core';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[upI18n]',
})
export class I18nDirective implements OnInit {
  cdr = inject(ChangeDetectorRef);
  i18nKey = input.required<string>();
  pSelect = inject(Select, { optional: true });
  pMultiSelect = inject(MultiSelect, { optional: true });
  translateService = inject(TranslateService);
  private readonly subscriptions: Subscription[] = [];

  private getComponent() {
    const component = this.pSelect || this.pMultiSelect;
    if (!component) {
      throw new Error('Not support primeng component');
    }
    return component;
  }

  ngOnInit(): void {
    const component = this.getComponent();
    const optionLabel = '__translation';
    component.optionLabel = optionLabel;
    const i18nKey = this.i18nKey();

    const translateOptions = (options: any[]) => {
      options?.forEach((opt) => {
        const key = _(opt[i18nKey]);
        this.translateService.get(key).subscribe((res) => {
          if (Array.isArray(key)) {
            opt[optionLabel] = key.map((k: string) => res[k]).join(' ') || '';
          } else {
            opt[optionLabel] = res;
          }
          this.cdr.markForCheck();
        });
      });
    };

    translateOptions(component?.options || []);
    this.subscriptions.push(
      this.translateService.onLangChange.subscribe(() => {
        translateOptions(component?.options || []);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
