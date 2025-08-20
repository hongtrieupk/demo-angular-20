import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FakeLoader } from '../../utils/testing.util';

import { SinglePicklistComponent } from './single-picklist.component';

describe('SinglePicklistComponent', () => {
  let component: SinglePicklistComponent;
  let fixture: ComponentFixture<SinglePicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePicklistComponent],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClearSearchClick should call filterDataSource()', () => {
    spyOn(component, 'filterDataSource');
    component.onClearSearchClick();
    expect(component.filterDataSource).toHaveBeenCalled();
  });

  it('onOpenedChangeMatSelect isOpen = true should not call moveSelectedItemToTop', () => {
    spyOn(component, 'moveSelectedItemToTop');
    spyOn(component, 'resetScroll');
    component.onOpenedChangeMatSelect(true);
    expect(component.resetScroll).toHaveBeenCalled();
    expect(component.moveSelectedItemToTop).not.toHaveBeenCalled();
  });

  it('onOpenedChangeMatSelect isOpen = false should call moveSelectedItemToTop', () => {
    spyOn(component, 'moveSelectedItemToTop');
    spyOn(component, 'resetScroll');
    component.onOpenedChangeMatSelect(false);
    expect(component.resetScroll).toHaveBeenCalled();
    expect(component.moveSelectedItemToTop).toHaveBeenCalled();
  });

  it('getHeight should call calculateHeight()', () => {
    spyOn(component, 'calculateHeight');
    component.getHeight();
    expect(component.calculateHeight).toHaveBeenCalled();
  });

  it('onSearchChange should call filterDataSource()', () => {
    spyOn(component, 'filterDataSource');
    component.onSearchChange();
    expect(component.filterDataSource).toHaveBeenCalled();
  });

  it('filterDataSource should filter data by searchValue', () => {
    component.datasource = [
      { id: '1', value: 'million' },
      { id: '2', value: 'not match' }
    ];
    component.filterDataSource('mil');
    expect(component.filteredData[0]).toEqual(component.datasource[0]);
  });

  it('moveSelectedItemToTop null filteredData should do nothing', () => {
    component.filteredData = [];
    component.selectedItem = undefined;
    component.moveSelectedItemToTop();
    expect(component.filteredData).toEqual(component.filteredData);
  });

  it('moveSelectedItemToTop selectedItem is not in the filteredData should be added to filteredData', () => {
    component.filteredData = [];
    component.selectedItem = {id: '1', value: 'value 1'};
    component.moveSelectedItemToTop();
    expect(component.filteredData[0]).toEqual(component.selectedItem);
  });

  it('moveSelectedItemToTop selectedItem is  in the filteredData should be move to the top', () => {
    component.filteredData = [
      {id: '1', value: 'value 1'},
      {id: '2', value: 'value 2'}
    ];
    component.selectedItem = component.filteredData[1];
    component.moveSelectedItemToTop();
    expect(component.filteredData[0]).toEqual(component.selectedItem);
  });
});
