import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { EMPTY_VALUE } from '../../../app.constant';
import { FieldCondition } from '../../models/condition-definition-interface';
import { VisibilityCondition } from '../../models/visibility-condition.model';
import { FakeLoader } from '../../utils/testing.util';
import { DateTimeTypeEnum, DropdownListTypeEnum, FreeInputTypeEnum } from '../condition-form/enum/field-type.enum';
import { BetweenOperatorEnum, MultipleValueOperatorEnum, NoValueOperatorEnum, SingleValueOperatorEnum } from '../condition-form/enum/operator.enum';

import { ConditionFormComponent } from './condition-form.component';

describe('ConditionFormComponent', () => {
  let component: ConditionFormComponent;
  let fixture: ComponentFixture<ConditionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConditionFormComponent],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionFormComponent);
    component = fixture.componentInstance;
    component.fields = [];
    component.condition = new VisibilityCondition();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isInvalidDate - invalid mm/dd/yyyy format should return true', () => {
    expect(component.isInvalidDate('dsfdsf')).toEqual(true);
  });

  it('isInvalidDate - valid mm/dd/yyyy format should return false', () => {
    expect(component.isInvalidDate('10/22/2020')).toEqual(false);
  });

  it('hasInvalidDates - selectedField is not Date type should return false', () => {
    component.selectedOptionField = undefined;
    expect(component.hasInvalidDates()).toEqual(false);
  });

  it('hasInvalidDates - date type & between condition & valid date values should return false', () => {
    component.selectedOptionField = { type: DateTimeTypeEnum.Date } as FieldCondition;
    component.condition.operator = BetweenOperatorEnum.Between;
    component.condition.values = ['10/22/2020', '10/27/2020'];
    expect(component.hasInvalidDates()).toEqual(false);
  });

  it('hasInvalidDates - date type & between condition & InValid from date values should return true', () => {
    component.selectedOptionField = { type: DateTimeTypeEnum.Date } as FieldCondition;
    component.condition.operator = BetweenOperatorEnum.Between;
    component.condition.values = ['invalid', '10/27/2020'];
    expect(component.hasInvalidDates()).toEqual(true);
  });

  it('hasInvalidDates - date type & between condition & Invalid to date values should return true', () => {
    component.selectedOptionField = { type: DateTimeTypeEnum.Date } as FieldCondition;
    component.condition.operator = BetweenOperatorEnum.Between;
    component.condition.values = ['10/22/2020', 'invalid'];
    expect(component.hasInvalidDates()).toEqual(true);
  });

  it('hasInvalidDates - date type & NOT between condition & valid date values should return false', () => {
    component.selectedOptionField = { type: DateTimeTypeEnum.Date } as FieldCondition;
    component.condition.operator = SingleValueOperatorEnum.Equal;
    component.condition.value = '10/22/2020';
    expect(component.hasInvalidDates()).toEqual(false);
  });

  it('hasInvalidDates - date type & NOT between condition & Invalid date values should return true', () => {
    component.selectedOptionField = { type: DateTimeTypeEnum.Date } as FieldCondition;
    component.condition.operator = SingleValueOperatorEnum.Equal;
    component.condition.value = 'invalid';
    expect(component.hasInvalidDates()).toEqual(true);
  });

  it('hasInvalidDates - condition.operator is empty should return false', () => {
    component.selectedOptionField = { type: DateTimeTypeEnum.Date } as FieldCondition;
    component.condition.operator = EMPTY_VALUE;
    expect(component.hasInvalidDates()).toEqual(false);
  });

  it('isSingleValueCondition - operator is NOT SingleValueOperatorEnum  should return false', () => {
    component.condition.operator = '';
    expect(component.isSingleValueCondition()).toEqual(false);
  });

  it('isSingleValueCondition - operator is SingleValueOperatorEnum  should return true', () => {
    component.condition.operator = SingleValueOperatorEnum.Equal;
    expect(component.isSingleValueCondition()).toEqual(true);
  });

  it('isMultipleValueCondition - operator is NOT MultipleValueOperatorEnum  should return false', () => {
    component.condition.operator = '';
    expect(component.isMultipleValueCondition()).toEqual(false);
  });

  it('isMultipleValueCondition - operator is MultipleValueOperatorEnum  should return true', () => {
    component.condition.operator = MultipleValueOperatorEnum.In;
    expect(component.isMultipleValueCondition()).toEqual(true);
  });

  it('isBetweenCondition - operator is NOT BetweenOperatorEnum  should return false', () => {
    component.condition.operator = '';
    expect(component.isBetweenCondition()).toEqual(false);
  });

  it('isBetweenCondition - operator is BetweenOperatorEnum  should return true', () => {
    component.condition.operator = BetweenOperatorEnum.Between;
    expect(component.isBetweenCondition()).toEqual(true);
  });

  it('isNoValueCondition - operator is NoValueOperatorEnum  should return true', () => {
    component.condition.operator = NoValueOperatorEnum.IsNotNull;
    expect(component.isNoValueCondition()).toEqual(true);
  });

  it('isNoValueCondition - operator is NOT NoValueOperatorEnum  should return false', () => {
    component.condition.operator = '';
    expect(component.isNoValueCondition()).toEqual(false);
  });

  it('isDropdownList - fieldtype PickList should return true', () => {
    component.selectedOptionField = {
      type: DropdownListTypeEnum.PickList
    } as FieldCondition;
    const isDropdown = component.isDropdownList();
    expect(isDropdown).toEqual(true);
  });

  it('isDropdownList - fieldtype invalid should return false', () => {
    component.selectedOptionField = undefined;
    expect(component.isDropdownList()).toEqual(false);

    component.selectedOptionField = {
      type: FreeInputTypeEnum.Text
    } as FieldCondition;
    const isDropdown = component.isDropdownList();
    expect(isDropdown).toEqual(false);
  });

  it('isDateTimeInput - fieldtype Date should return true', () => {
    component.selectedOptionField = {
      type: DateTimeTypeEnum.Date
    } as FieldCondition;
    const isDateTime = component.isDateTimeInput();
    expect(isDateTime).toEqual(true);
  });

  it('isDateTimeInput - fieldtype invalid should return false', () => {
    component.selectedOptionField = undefined;
    expect(component.isDateTimeInput()).toEqual(false);

    component.selectedOptionField = {
      type: FreeInputTypeEnum.Number
    } as FieldCondition;
    const isDateTime = component.isDateTimeInput();
    expect(isDateTime).toEqual(false);
  });

  it('isFreeInput - fieldtype text should return true', () => {
    component.selectedOptionField = {
      type: FreeInputTypeEnum.Text
    } as FieldCondition;
    const isFreeInput = component.isFreeInput();
    expect(isFreeInput).toEqual(true);
  });

  it('isFreeInput - fieldtype in valid should return false', () => {
    component.selectedOptionField = undefined;
    expect(component.isFreeInput()).toEqual(false);

    component.selectedOptionField = {
      type: DropdownListTypeEnum.Boolean
    } as FieldCondition;
    const isFreeInput = component.isFreeInput();
    expect(isFreeInput).toEqual(false);
  });

  it('onChangeFieldOption should set selectedOptionField', () => {
    const selectedOptionField = {
      id: '',
      value: '',
      type: '',
      multiple: false,
      operators: [{ id: 'eq', value: '=' }],
      values: []
    };
    component.onChangeFieldOption(selectedOptionField);
    expect(component.selectedOptionField).toEqual(selectedOptionField);
  });

  it('onDelete should emit deleteCondition event', () => {
    spyOn(component.deleteCondition, 'emit');
    component.onDelete();
    expect(component.deleteCondition.emit).toHaveBeenCalled();
  });

  it('onAddNew should emit addNew event', () => {
    spyOn(component.addNew, 'emit');
    component.onAddNew();
    expect(component.addNew.emit).toHaveBeenCalled();
  });

  it('onChangeFieldOption null input should NOT set selectedOptionField', () => {
    component.selectedOptionField = {} as FieldCondition;
    component.onChangeFieldOption(undefined);
    expect(component.selectedOptionField).not.toBeUndefined();
  });

  it('setValuesForCondition should set values base on type of operator', () => {
    // isNoValue Case
    component.operatorControl.setValue({ id: NoValueOperatorEnum.IsNull, value: NoValueOperatorEnum.IsNull }, { emitEvent: false });
    component.setValuesForCondition();
    expect(component.condition.value).toEqual(EMPTY_VALUE);

    // isSingleValue Case
    component.operatorControl.setValue({ id: SingleValueOperatorEnum.Equal, value: SingleValueOperatorEnum.Equal }, { emitEvent: false });
    component.valueControl.setValue('100', { emitEvent: false });
    component.setValuesForCondition();
    expect(component.condition.value).toEqual(component.formatConditionValue('100'));

    // isMultipleValue Case
    component.operatorControl.setValue({ id: MultipleValueOperatorEnum.In, value: MultipleValueOperatorEnum.In }, { emitEvent: false });
    component.valueControl.setValue(['1', '2'], { emitEvent: false });
    component.setValuesForCondition();
    expect(component.condition.values).toEqual(['1', '2']);

    // isBetween Case
    component.operatorControl.setValue({ id: BetweenOperatorEnum.Between, value: BetweenOperatorEnum.Between }, { emitEvent: false });
    component.fromValueControl.setValue('2/2/2021', { emitEvent: false });
    component.toValueControl.setValue('6/2/2021', { emitEvent: false });
    component.setValuesForCondition();
    const expected = [component.formatConditionValue(component.fromValueControl.value),
    component.formatConditionValue(component.toValueControl.value)];
    expect(component.condition.values).toEqual(expected);
  });

  it('parseInputValue date input type should return datetime', () => {
    const selectedOptionField = {
      id: 'eventDate',
      value: 'EventDate',
      type: DateTimeTypeEnum.Date,
      multiple: false,
      operators: [],
      values: []
    };
    component.selectedOptionField = selectedOptionField;
    const result = component.parseInputValue('10/22/2020');
    expect(result).toEqual(new Date('10/22/2020'));
  });

  it('parseInputValue NOT datetime input type should return string', () => {
    const selectedOptionField = {
      id: 'text',
      value: 'text',
      type: FreeInputTypeEnum.Text,
      multiple: false,
      operators: [],
      values: []
    };
    component.selectedOptionField = selectedOptionField;
    const result = component.parseInputValue('10/22/2020');
    expect(result).toEqual('10/22/2020');
  });

  it('formatConditionValue date input type should return string MM/DD/YYY', () => {
    const selectedOptionField = {
      id: 'eventDate',
      value: 'EventDate',
      type: DateTimeTypeEnum.Date,
      multiple: false,
      operators: [],
      values: []
    };
    component.selectedOptionField = selectedOptionField;
    const result = component.formatConditionValue(new Date('10/22/2020'));
    expect(result).toEqual('10/22/2020');
  });

  it('formatConditionValue string input type should return string value', () => {
    const selectedOptionField = {
      id: 'name',
      value: 'Name',
      type: FreeInputTypeEnum.String,
      multiple: false,
      operators: [],
      values: []
    };
    component.selectedOptionField = selectedOptionField;
    const result = component.formatConditionValue('Test Name');
    expect(result).toEqual('Test Name');
  });

  it('initOptions selectedFieldOption Null should init options []', () => {
    component.operatorOptions = [];
    component.selectedOptionField = {
      id: '',
      value: '',
      type: '',
      multiple: false,
      operators: [{ id: SingleValueOperatorEnum.Equal, value: '=' }],
      values: []
    };
    component.initDropdownOptions();
    expect(component.operatorOptions.length).toEqual(1);
  });

  it('initOptions selectedFieldOption not null should init options', () => {
    component.operatorOptions = [];
    component.selectedOptionField = undefined;
    component.initDropdownOptions();
    expect(component.operatorOptions.length).toEqual(0);
  });

  it('getValueFieldWrapperClass form has required error should return "input-wrapper has-error"', () => {
    const formControl = { hasError: (x: string): boolean => true } as FormControl;
    const cssClass = component.getValueFieldWrapperClass(formControl);
    expect(cssClass).toEqual('input-wrapper has-error');
  });

  it('getValueFieldWrapperClass form valid but has dateTime error should return "input-wrapper has-error"', () => {
    const formControl = { hasError: (x: string): boolean => false } as FormControl;
    spyOn(component.condition, 'hasInValidDateTimeRange').and.returnValue(true);
    const cssClass = component.getValueFieldWrapperClass(formControl);
    expect(cssClass).toEqual('input-wrapper has-error');
  });

  it('getValueFieldWrapperClass form valid and no dateTime error should return "input-wrapper"', () => {
    const formControl = { hasError: (x: string): boolean => false } as FormControl;
    spyOn(component.condition, 'hasInValidDateTimeRange').and.returnValue(false);
    const cssClass = component.getValueFieldWrapperClass(formControl);
    expect(cssClass).toEqual('input-wrapper');
  });
});
