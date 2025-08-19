import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../layout.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SplitButton, SplitButtonModule } from 'primeng/splitbutton';
import { LOCALIZATION_LOCAL_STORAGE_KEY } from '../../core/i18n';

@Component({
  selector: 'app-topbar',
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    SplitButtonModule,
    TranslatePipe,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private translateService = inject(TranslateService);
  items!: MenuItem[];

  languageItems = [
    {
      label: 'English',
      command: () => this.select('en'),
    },
    {
      label: 'Other language',
      command: () => this.select('other'),
    }
  ];
  constructor(public layoutService: LayoutService) {}

  select(action: string) {
    this.translateService.use(action);
    localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, action);
  }
  onClickSelectLanguages(event: MouseEvent, btn: SplitButton) {
    setTimeout(() => {
      btn.onDropdownButtonClick(event);
    }, 0);
  }
  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
