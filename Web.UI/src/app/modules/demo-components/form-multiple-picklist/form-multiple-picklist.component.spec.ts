import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { EMPTY_VALUE } from '../../../app.constant';
import { FakeLoader } from '../../utils/testing.util';
import { FormMultiplePicklistComponent } from './form-multiple-picklist.component';

describe('SimpleMultiplePicklistComponent', () => {
  let component: FormMultiplePicklistComponent;
  let fixture: ComponentFixture<FormMultiplePicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormMultiplePicklistComponent],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMultiplePicklistComponent);
    component = fixture.componentInstance;
    component.inputSelect = { nativeElement: {} } as ElementRef<HTMLInputElement>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onChangeValues should set value for selectedValues', () => {
    const selectedOptions = [{ id: '1', value: 'One' }, { id: '2', value: 'Two' }];
    spyOn(component, 'initValueForInputSelect');
    component.onChangeValues(selectedOptions);
    expect(component.selectedValues).toEqual(selectedOptions.map(x => x.id));
    expect(component.initValueForInputSelect).toHaveBeenCalled();
  });

  it('getDisplayValues - empty selectedOptions should return EmptyValue', () => {
    component.selectedOptions = [];
    const displayValues = component.getDisplayValues();
    expect(displayValues).toEqual(EMPTY_VALUE);
  });

  it('getDisplayValues - selectedOptions has data should return correct value', () => {
    component.selectedOptions = [{ id: '3', value: 'Three' }, { id: '4', value: 'Four' }];
    const displayValues = component.getDisplayValues();
    expect(displayValues).toEqual(`${component.selectedOptions[0].value}, ${component.selectedOptions[1].value}`);
  });
});
