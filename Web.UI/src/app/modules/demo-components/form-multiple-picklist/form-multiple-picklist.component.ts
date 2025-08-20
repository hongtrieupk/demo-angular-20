import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MultiplePicklistComponent } from '../multiple-picklist/multiple-picklist.component';
import { compareByValueProperty, isNotEmptyArray } from '../models/array.util';
import {
  EMPTY_VALUE,
  KeyValueModel,
} from '../models/visibility-condition.model';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-multiple-picklist',
  templateUrl: './form-multiple-picklist.component.html',
  styleUrls: ['./form-multiple-picklist.component.scss'],
  imports: [
    CommonModule,
    MultiplePicklistComponent,
    ReactiveFormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class FormMultiplePicklistComponent implements OnInit, AfterViewInit {
  @Input() datasource: KeyValueModel[] = [];
  @Input() isRequired = false;
  @Input() multipleSelectControl = new FormControl();
  @Input()
  selectedValues: string[] = [];

  @ViewChild('inputSelect') inputSelect: ElementRef<HTMLInputElement> =
    {} as ElementRef<HTMLInputElement>;
  selectedOptions: KeyValueModel[] = [];

  ngOnInit(): void {
    this.datasource = this.datasource.slice().sort(compareByValueProperty);
    this.selectedOptions = this.datasource.filter(
      (x) => this.selectedValues.indexOf(x.id) > -1,
    );
  }

  ngAfterViewInit(): void {
    this.initValueForInputSelect();
  }

  onChangeValues(selectedOptions: KeyValueModel[]): void {
    this.selectedValues = selectedOptions.map((x) => x.id);
    this.selectedOptions = selectedOptions;
    this.initValueForInputSelect();
  }

  initValueForInputSelect(): void {
    this.multipleSelectControl.setValue(this.selectedValues);
    this.inputSelect.nativeElement.value = this.getDisplayValues();
  }

  getDisplayValues(): string {
    if (isNotEmptyArray(this.selectedOptions)) {
      const values = this.selectedOptions.map((x) => x.value);
      return values.reduce(
        (accumulator, currentValue) => `${accumulator}, ${currentValue}`,
      );
    }
    return EMPTY_VALUE;
  }

  openSelectPanel(picklistComponent: MultiplePicklistComponent): void {
    picklistComponent.showMultipleSelectChips();
  }
}
