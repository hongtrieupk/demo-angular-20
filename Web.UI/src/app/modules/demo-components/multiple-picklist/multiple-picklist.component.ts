import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BasePicklistComponent } from '../single-picklist/base-picklist.component';
import { EMPTY_VALUE } from '../models/visibility-condition.model';
import { compareByValueProperty, removeItem } from '../models/array.util';
import { IChipDatasource } from '../models/value.comparable';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-multiple-picklist',
  templateUrl: './multiple-picklist.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatIconModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ScrollingModule,
    MatChipsModule,
  ],
  styleUrls: ['./multiple-picklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiplePicklistComponent
  extends BasePicklistComponent
  implements OnInit, OnChanges
{
  @ViewChild('virtualScrollViewport')
  virtualScrollViewport: CdkVirtualScrollViewport =
    {} as CdkVirtualScrollViewport;
  @Output() selectionChange$ = new EventEmitter<IChipDatasource[]>();
  @Input() datasource: IChipDatasource[] = [];
  @Input() selectedData: IChipDatasource[] = [];
  @Input() isShowAsButton = false;
  @Input() isHidden = false;
  @Input() title = EMPTY_VALUE;

  pendingData: IChipDatasource[] = [];
  filteredData: IChipDatasource[] = [];
  multipleSelectControl = new FormControl();
  searchValue = EMPTY_VALUE;
  itemHeight = 47;

  @ViewChild('matSelect') matSelect: MatSelect | undefined;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement> =
    {} as ElementRef<HTMLInputElement>;

  constructor(private renderer: Renderer2) {
    super();
  }
  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.selectedData = this.selectedData.slice().sort(compareByValueProperty);
    this.setSelectedIdsForMultipleSelectControl(this.selectedData);
    this.datasource = this.datasource.slice().sort(compareByValueProperty);
    this.filteredData = [...this.datasource];
    this.pendingData = [...this.selectedData];
  }

  onSearchChange(event: any): void {
    this.searchItem(event.target.value);
  }

  getHeight(): string {
    return this.calculateHeight(this.itemHeight, this.filteredData.length);
  }

  onClearSearchClick(): void {
    this.searchValue = EMPTY_VALUE;
    this.searchItem(EMPTY_VALUE);
  }

  searchItem(query: string): void {
    const data = [...this.datasource];
    this.filteredData = data.filter((item) =>
      item.value.toLowerCase().includes(query.toLowerCase()),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasource'] || changes['selectedData']) {
      this.initData();
    }
  }

  toggleSelection(item: IChipDatasource): void {
    if (this.pendingData.find((pendingItem) => pendingItem.id === item.id)) {
      removeItem(this.pendingData, 'id', item.id);
    } else {
      this.pendingData.push(item);
    }
  }

  showMultipleSelectChips(): void {
    this.matSelect?.open();
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
    this.resetScroll();
  }

  resetScroll(): void {
    if (!!this.virtualScrollViewport) {
      const virtualScrollWrapper =
        this.virtualScrollViewport.elementRef.nativeElement.firstChild;
      this.renderer.setStyle(
        virtualScrollWrapper,
        'transform',
        'translateY(0px)',
      );
    }
  }

  removeItem(item: IChipDatasource): void {
    const index = this.selectedData.indexOf(item);
    if (index >= 0) {
      this.selectedData = this.selectedData.filter(
        (data) => data.id !== item.id,
      );
      this.setSelectedIdsForMultipleSelectControl(this.selectedData);
      removeItem(this.pendingData, 'id', item.id);
      this.selectionChange$.emit(this.selectedData);
    }
  }

  private setSelectedIdsForMultipleSelectControl(
    selectedItems: IChipDatasource[],
  ): void {
    const selectedIds =
      selectedItems.length > 0 ? selectedItems.map((x) => x.id) : [];
    this.multipleSelectControl.setValue(selectedIds);
  }

  onCancel(): void {
    this.matSelect?.close();
    this.multipleSelectControl.setValue(
      this.selectedData.map((item) => item.id),
    );
    this.searchItem(EMPTY_VALUE);
    this.searchInput.nativeElement.value = '';
  }

  onConfirm(): void {
    this.matSelect?.close();
    this.selectedData = [...this.pendingData].sort(compareByValueProperty);
    this.selectionChange$.emit(this.selectedData);
  }
}
