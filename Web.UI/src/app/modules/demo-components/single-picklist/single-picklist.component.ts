import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import {
  EMPTY_VALUE,
  KeyValueModel,
} from '../models/visibility-condition.model';
import { BasePicklistComponent } from './base-picklist.component';
import { compareByValueProperty } from '../models/array.util';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-picklist',
  templateUrl: './single-picklist.component.html',
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
    
  ],
  styleUrls: ['./single-picklist.component.scss'],
})
export class SinglePicklistComponent
  extends BasePicklistComponent
  implements OnInit
{
  @Input() datasource: KeyValueModel[] = [];
  @Input() isRequired = false;
  @Input() singleSelectControl = new FormControl();
  @Input() selectedItem: KeyValueModel | undefined;
  @Output() changeItem: EventEmitter<any> = new EventEmitter();

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement> =
    {} as ElementRef<HTMLInputElement>;
  @ViewChild('matSelect') matSelect: MatSelect = {} as MatSelect;
  filteredData: KeyValueModel[] = [];
  searchValue = EMPTY_VALUE;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.datasource = this.datasource.slice().sort(compareByValueProperty);
    this.filterDataSource(EMPTY_VALUE);
    this.moveSelectedItemToTop();
  }

  onSelectItem(item: any): void {
    this.selectedItem = item;
    this.changeItem.emit(item);
  }

  onClearSearchClick(): void {
    this.searchInput.nativeElement.value = EMPTY_VALUE;
    this.filterDataSource(EMPTY_VALUE);
  }

  onOpenedChangeMatSelect(isOpen: any): void {
    if (isOpen) {
      setTimeout(() => this.searchInput.nativeElement.focus(), 0);
    }
    if (!isOpen) {
      this.moveSelectedItemToTop();
    }
  }

  moveSelectedItemToTop(): void {
    if (!this.selectedItem) {
      return;
    }
    const selectedId = this.selectedItem.id;
    // handle the issue is: mat-select lost selected text with virtual scroll
    const matchedItem = this.filteredData.find((x) => x.id === selectedId);
    if (!matchedItem) {
      this.filteredData.unshift(this.selectedItem);
    } else {
      const index = this.filteredData.indexOf(matchedItem);
      this.filteredData.splice(index, 1);
      this.filteredData.unshift(matchedItem);
    }
    this.filteredData = this.filteredData.slice();
  }

  getHeight(): string {
    return this.calculateHeight(42, this.filteredData.length);
  }

  onSearchChange(): void {
    this.filterDataSource(this.searchValue);
  }

  filterDataSource(searchValue: string): void {
    this.filteredData = this.datasource.filter((item) =>
      item.value.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  openDropDown(): void {
    this.matSelect.open();
  }
}
