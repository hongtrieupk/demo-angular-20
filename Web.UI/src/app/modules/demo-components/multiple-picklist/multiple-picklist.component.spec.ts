import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FakeLoader } from '../../utils/testing.util';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MultiplePicklistComponent } from './multiple-picklist.component';

describe('MultiplePicklistComponent', () => {
  let component: MultiplePicklistComponent;
  let fixture: ComponentFixture<MultiplePicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatSelectModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ScrollingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      declarations: [MultiplePicklistComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplePicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set selected data for multipleSelectControl', () => {
    component.selectedData = [
      {
        value: 'Value',
        id: '2',
      }];
    component.ngOnInit();
    expect(component.multipleSelectControl.value).toEqual(['2']);
  });

  it('toggleSelection should add item to pendingdata', () => {
    component.pendingData = [
      {
        value: 'Test 2',
        id: '2'
      },
      {
        value: 'Test 3',
        id: '3'
      },
      {
        value: 'Test 4',
        id: '4'
      }];
    const item = {
      value: 'Test 1',
      id: '1'
    };
    component.toggleSelection(item);
    expect(component.pendingData.length).toEqual(4);
  });

  it('toggleSelection should remove item from pendingdata if exists', () => {
    component.pendingData = [
      {
        value: 'Test 2',
        id: '2'
      },
      {
        value: 'Test 3',
        id: '3'
      },
      {
        value: 'Test 4',
        id: '4'
      }];
    const item = {
      value: 'Test 2',
      id: '2'
    };
    component.toggleSelection(item);
    expect(component.pendingData.length).toEqual(2);
  });

  it('getHeight should return correct height', () => {
    component.filteredData = [
      {
        value: 'Test 2',
        id: '2'
      },
      {
        value: 'Test 3',
        id: '3'
      },
      {
        value: 'Test 4',
        id: '4'
      }];
    let result = component.getHeight();
    expect(result).toEqual(component.calculateHeight(component.itemHeight, component.filteredData.length));

    component.filteredData = [];
    result = component.getHeight();
    expect(result).toEqual(component.itemHeight.toString());
  });

  it('removeItem should remove item from selectedData and remove id from multipleSelectControl', () => {
    const selectedIds = ['2', '3'];
    component.datasource = [
      {
        value: 'Test 2',
        id: '2'
      },
      {
        value: 'Test 3',
        id: '3'
      },
      {
        value: 'Test 4',
        id: '4'
      }];
    component.selectedData = component.datasource.filter(x => selectedIds.indexOf(x.id) >= 0);
    component.multipleSelectControl.setValue(selectedIds);
    component.removeItem(component.datasource[0]);
    expect(component.selectedData.length).toBe(1);
    expect(component.multipleSelectControl.value).toEqual(['3']);
  });

  it('initData should set values for filteredData and multipleSelectControl', () => {
    component.datasource = [
      {
        value: 'chip 2',
        id: '3'
      }];

    component.selectedData = [component.datasource[0]];
    component.initData();
    expect(component.filteredData.length).toEqual(component.datasource.length);
  });

  it('onConfirm should assign data', () => {
    spyOn(component.selectionChange$, 'emit');
    component.pendingData = [
      {
        value: '1',
        id: '1'
      }
    ];
    component.selectedData = [];
    component.onConfirm();
    expect(component.selectedData.length).toEqual(1);
    expect(component.selectionChange$.emit).toHaveBeenCalled();
  });
});
