import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  DateTimeTypeEnum,
  DropdownListTypeEnum,
  FreeInputTypeEnum,
} from '../condition-form/enum/field-type.enum';
import {
  BetweenOperatorEnum,
  MultipleValueOperatorEnum,
  NoValueOperatorEnum,
  SingleValueOperatorEnum,
} from '../condition-form/enum/operator.enum';
import { FieldCondition } from '../models/condition-definition-interface';
import {
  EMPTY_VALUE,
  KeyValueModel,
  VisibilityCondition,
} from '../models/visibility-condition.model';
import { filterOperatorsByFieldType } from '../condition-operators.util';
import { SinglePicklistComponent } from '../single-picklist/single-picklist.component';
import { FormMultiplePicklistComponent } from '../form-multiple-picklist/form-multiple-picklist.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-condition-form',
  templateUrl: './condition-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SinglePicklistComponent,
    FormMultiplePicklistComponent,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  styleUrls: ['./condition-form.component.scss'],
})
export class ConditionFormComponent implements OnInit {
  @Input() condition: VisibilityCondition = {} as VisibilityCondition;
  @Input() fields: FieldCondition[] = [];
  @Output() changeCondition: EventEmitter<VisibilityCondition> =
    new EventEmitter();
  @Output() deleteCondition: EventEmitter<VisibilityCondition> =
    new EventEmitter();
  @Output() addNew: EventEmitter<void> = new EventEmitter();

  operatorOptions: KeyValueModel[] = [];
  valueOptions: KeyValueModel[] = [];
  selectedOptionField: FieldCondition | undefined;
  selectedValueForDropDown: KeyValueModel | undefined;

  fieldControl = new FormControl();
  operatorControl = new FormControl();
  valueControl = new FormControl();
  fromValueControl = new FormControl();
  toValueControl = new FormControl();

  conditionForm = new FormGroup({
    fieldControl: this.fieldControl,
    valueControl: this.valueControl,
    fromValueControl: this.fromValueControl,
    toValueControl: this.toValueControl,
    operatorControl: this.operatorControl,
  });

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.initCondition();
    this.initDropdownOptions();
    this.updateValidatorForValueControls();
    this.initFormValue();

    this.valueControl.valueChanges.subscribe(() => {
      this.onChangeCondition();
    });
    this.fromValueControl.valueChanges.subscribe(() => {
      this.onChangeCondition();
    });
    this.toValueControl.valueChanges.subscribe(() => {
      this.onChangeCondition();
    });
  }

  onDelete(): void {
    this.deleteCondition.emit(this.condition);
  }

  onAddNew(): void {
    this.addNew.emit();
  }

  onChangeCondition(): void {
    setTimeout(() => {
      this.setValuesForCondition();
      this.condition.isValid =
        this.conditionForm.valid && !this.condition.hasInValidDateTimeRange();
      this.changeCondition.emit(this.condition);
    }, 100);
  }

  onChangeOperator(operator: KeyValueModel): void {
    this.condition.operator = operator.id;
    this.condition.operatorDisplay = operator.value;
    this.updateValidatorForValueControls();
    this.onChangeCondition();
  }

  onChangeFieldOption(fieldOption: FieldCondition | undefined): void {
    if (!fieldOption) {
      return;
    }
    this.selectedOptionField = fieldOption;
    this.condition.fieldDisplay = fieldOption.value;
    this.operatorControl.reset(null, { emitEvent: false });
    this.resetValueFields();
    this.initDropdownOptions();

    this.onChangeCondition();
  }

  setValuesForCondition(): void {
    const { operatorControl, fromValueControl, toValueControl, valueControl } =
      this.conditionForm.value;
    this.condition.field = !!this.selectedOptionField
      ? this.selectedOptionField?.id
      : EMPTY_VALUE;
    this.condition.operator = operatorControl?.id;
    this.condition.value = EMPTY_VALUE;
    this.condition.values = [];
    if (this.isNoValueCondition()) {
      return;
    }
    if (this.isSingleValueCondition()) {
      this.condition.value = this.isDropdownList()
        ? valueControl?.id
        : this.formatConditionValue(valueControl);
      return;
    }
    if (this.isMultipleValueCondition()) {
      this.condition.values = valueControl;
      return;
    }
    if (this.isBetweenCondition()) {
      this.condition.values = [
        this.formatConditionValue(fromValueControl),
        this.formatConditionValue(toValueControl),
      ];
    }
  }

  updateValidatorForValueControls(): void {
    const validators =
      this.isNoValueCondition() || !this.condition.operator
        ? []
        : [Validators.required];
    if (this.isBetweenCondition()) {
      this.conditionForm.controls.fromValueControl.setValidators(validators);
      this.conditionForm.controls.toValueControl.setValidators(validators);
      this.conditionForm.controls.fromValueControl.updateValueAndValidity({
        emitEvent: false,
      });
      this.conditionForm.controls.toValueControl.updateValueAndValidity({
        emitEvent: false,
      });

      this.conditionForm.controls.valueControl.clearValidators();
      this.conditionForm.controls.valueControl.updateValueAndValidity({
        emitEvent: false,
      });
    } else {
      this.conditionForm.controls.valueControl.setValidators(validators);
      this.conditionForm.controls.valueControl.updateValueAndValidity({
        emitEvent: false,
      });

      this.conditionForm.controls.fromValueControl.clearValidators();
      this.conditionForm.controls.fromValueControl.updateValueAndValidity({
        emitEvent: false,
      });
      this.conditionForm.controls.toValueControl.clearValidators();
      this.conditionForm.controls.toValueControl.updateValueAndValidity({
        emitEvent: false,
      });
    }
  }

  private resetValueFields(): void {
    this.conditionForm.controls.valueControl.reset(null, { emitEvent: false });
    this.conditionForm.controls.fromValueControl.reset(null, {
      emitEvent: false,
    });
    this.conditionForm.controls.toValueControl.reset(null, {
      emitEvent: false,
    });
  }

  initCondition(): void {
    if (!this.condition) {
      return;
    }
    this.selectedOptionField = this.fields.find(
      (x) => x.id === this.condition.field,
    );
    const selectedOperator = this.selectedOptionField?.operators.find(
      (x) => this.condition.operator === x.id,
    );
    this.condition.operatorDisplay = selectedOperator?.value ?? '';
    this.condition.fieldDisplay = this.selectedOptionField?.value ?? '';
  }

  initDropdownOptions(): void {
    if (this.selectedOptionField) {
      this.operatorOptions = filterOperatorsByFieldType(
        this.selectedOptionField.operators,
        this.selectedOptionField.type,
        this.selectedOptionField.multiple,
      );
      this.valueOptions = this.selectedOptionField.values?.map((x) => {
        return { id: x, value: x };
      });
      this.selectedValueForDropDown = undefined;
    } else {
      this.operatorOptions = [];
    }
  }

  initFormValue(): void {
    const selectedOperator = this.selectedOptionField?.operators.find(
      (x) => this.condition.operator === x.id,
    );
    this.conditionForm.controls.operatorControl.setValue(selectedOperator, {
      emitEvent: false,
    });

    if (this.isBetweenCondition() && this.condition.values) {
      this.conditionForm.controls.fromValueControl.setValue(
        this.parseInputValue(this.condition.values[0]),
        { emitEvent: false },
      );
      this.conditionForm.controls.toValueControl.setValue(
        this.parseInputValue(this.condition.values[1]),
        { emitEvent: false },
      );
    }
    if (this.isSingleValueCondition()) {
      this.conditionForm.controls.valueControl.setValue(
        this.parseInputValue(this.condition.value),
        { emitEvent: false },
      );
    }

    if (this.isDropdownList()) {
      this.selectedValueForDropDown = this.valueOptions.find(
        (x) => x.id === this.condition.value,
      );
    }
    this.condition.isValid = this.conditionForm.valid;
  }

  formatConditionValue(value: string | Date): string {
    if (this.isDateTimeInput() && !!value) {
      const dateTime = value as Date;
      return dateTime.toLocaleDateString('en-US');
    }
    return value as string;
  }

  parseInputValue(value: string): string | Date {
    return this.isDateTimeInput() ? new Date(value) : value;
  }

  getValueFieldWrapperClass(formControl: FormControl): string {
    const errorClass = 'input-wrapper has-error';
    const noErrorClass = 'input-wrapper';
    return formControl.hasError('required') ||
      this.condition.hasInValidDateTimeRange()
      ? errorClass
      : noErrorClass;
  }

  isInvalidDate(date: string): boolean {
    return isNaN(Date.parse(date));
  }

  hasInvalidDates(): boolean {
    if (
      this.selectedOptionField?.type !== DateTimeTypeEnum.Date ||
      !this.condition.operator ||
      this.isNoValueCondition()
    ) {
      return false;
    }
    if (
      this.condition.operator === BetweenOperatorEnum.Between &&
      this.condition.values.length === 2
    ) {
      return (
        this.isInvalidDate(this.condition.values[0]) ||
        this.isInvalidDate(this.condition.values[1])
      );
    }
    return this.isInvalidDate(this.condition.value);
  }

  isSingleValueCondition(): boolean {
    return Object.values(SingleValueOperatorEnum).includes(
      this.condition.operator as SingleValueOperatorEnum,
    );
  }

  // only apply for multiple picklisk
  isMultipleValueCondition(): boolean {
    return Object.values(MultipleValueOperatorEnum).includes(
      this.condition.operator as MultipleValueOperatorEnum,
    );
  }

  isBetweenCondition(): boolean {
    return this.condition.operator === BetweenOperatorEnum.Between;
  }

  isNoValueCondition(): boolean {
    return Object.values(NoValueOperatorEnum).includes(
      this.condition.operator as NoValueOperatorEnum,
    );
  }

  isDropdownList(): boolean {
    return (
      !!this.selectedOptionField &&
      Object.values(DropdownListTypeEnum).includes(
        this.selectedOptionField.type as DropdownListTypeEnum,
      )
    );
  }

  isNumberInput(): boolean {
    return (
      !!this.selectedOptionField &&
      this.selectedOptionField.type === FreeInputTypeEnum.Number
    );
  }

  isFreeInput(): boolean {
    return (
      !!this.selectedOptionField &&
      !this.isDropdownList() &&
      !this.isDateTimeInput()
    );
  }

  isDateTimeInput(): boolean {
    return (
      !!this.selectedOptionField &&
      Object.values(DateTimeTypeEnum).includes(
        this.selectedOptionField.type as DateTimeTypeEnum,
      )
    );
  }
}
