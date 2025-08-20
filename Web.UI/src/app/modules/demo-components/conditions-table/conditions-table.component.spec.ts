import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { mockConditions } from '../../../_store/mocks/common.mock';
import { VisibilityCondition } from '../../models/visibility-condition.model';
import { initialState as commonState } from '../../../core/common/store/common.reducers';
import { ConditionsTableComponent } from './conditions-table.component';
import { selectFields } from '../../../core/common/store/common.selectors';
import { ElementRef } from '@angular/core';
import { EMPTY_VALUE } from 'src/app/app.constant';
import { JoinOperatorEnum } from '../condition-form/enum/operator.enum';
import { ToastrService } from 'ngx-toastr';

export class MatDialogMock {
  open(): any {
    return {
      componentInstance: {
        confirm: new BehaviorSubject<VisibilityCondition>(new VisibilityCondition())
      },
      close(): any {
        return true;
      }
    };
  }
}
describe('ConditionsTableComponent', () => {
  let component: ConditionsTableComponent;
  let fixture: ComponentFixture<ConditionsTableComponent>;
  const initialState = { ...commonState };
  let store: MockStore;
  let dialog: MatDialog;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(),
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatDialogModule],
      declarations: [ConditionsTableComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
        { provide: MatDialog, useClass: MatDialogMock },
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj(ToastrService.name, ['warning'])
        }
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectFields, initialState.fields);
    fixture = TestBed.createComponent(ConditionsTableComponent);
    component = fixture.componentInstance;
    component.deletedConditions = mockConditions;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
    spyOn(store, 'pipe');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createLastCondition should push new collection to selectedConditions', () => {
    component.selectedConditions = [];
    component.createLastCondition();
    expect(component.selectedConditions.length).toEqual(1);
  });

  it('insertNewCondition should insert new collection next to currentCondition', () => {
    const currentCondtion = new VisibilityCondition();
    const lastCondition = new VisibilityCondition();
    const conditions = [currentCondtion, lastCondition];
    component.insertNewCondition(conditions, currentCondtion);
    expect(conditions.indexOf(lastCondition)).toEqual(2);
  });

  it('filter with input type not string or empty string should return all Conditions', () => {
    const filterCondition = component.filter(new VisibilityCondition());
    expect(filterCondition.length).toBe(component.deletedConditions.length);

    const filterCondition1 = component.filter('');
    expect(filterCondition1.length).toBe(component.deletedConditions.length);
  });

  it('filter with valid input should filter Conditions', () => {
    const filterCondition = component.filter('status');
    expect(filterCondition.length).toBe(1);
  });
  it('showAddSubCondtionIcon INVALID condition should return false', () => {
    const selectedCondition = new VisibilityCondition();
    selectedCondition.conditions = [new VisibilityCondition()];
    expect(component.showAddSubCondtionIcon(selectedCondition)).toEqual(false);
  });
  it('showAddSubCondtionIcon VALID condition should return true', () => {
    const selectedCondition = new VisibilityCondition();
    selectedCondition.conditions = [];
    expect(component.showAddSubCondtionIcon(selectedCondition)).toEqual(true);
  });

  it('removeSubCondition should remove condition from parent', () => {
    const parent = new VisibilityCondition();
    parent.conditions = [new VisibilityCondition()];
    component.removeSubCondition(0, parent);
    expect(parent.conditions.length).toBe(0);
  });

  it('addSubCondition index < 1 should do nothing', () => {
    spyOn(component, 'onChangeConditions');
    component.addSubCondition(0);
    expect(component.onChangeConditions).not.toHaveBeenCalled();
  });

  it('addSubCondition this.selectedConditions.length < 2 should not call onChangeConditions', () => {
    spyOn(component, 'onChangeConditions');
    component.selectedConditions = [new VisibilityCondition()];
    component.addSubCondition(1);
    expect(component.onChangeConditions).not.toHaveBeenCalled();
  });

  it('addSubCondition condition has subCondition should not call onChangeConditions', () => {
    spyOn(component, 'onChangeConditions');
    const tobeSubCondition = new VisibilityCondition();
    tobeSubCondition.conditions = [new VisibilityCondition()];
    component.selectedConditions = [new VisibilityCondition(), tobeSubCondition];
    component.addSubCondition(1);
    expect(component.onChangeConditions).not.toHaveBeenCalled();
  });

  it('addSubCondition valid index should call onChangeConditions', () => {
    spyOn(component, 'onChangeConditions');
    component.selectedConditions = [new VisibilityCondition(), new VisibilityCondition()];
    component.addSubCondition(1);
    expect(component.onChangeConditions).toHaveBeenCalled();
  });

  it('onAndCondition should set connector to and', () => {
    const condition = new VisibilityCondition();
    const connectorHtml = {} as HTMLSpanElement;
    component.onAndCondition(condition, connectorHtml);
    expect(condition.connector).toEqual(JoinOperatorEnum.And);
  });

  it('onOrCondition should set connector to or', () => {
    const condition = new VisibilityCondition();
    component.onOrCondition(condition);
    expect(condition.connector).toEqual(JoinOperatorEnum.Or);
  });

  it('getBreakConnectorLineId should return break-connector-line-${this.componentId}-${index}', () => {
    expect(component.getBreakConnectorLineId(1)).toEqual(`break-connector-line-${component.componentId}-1`);
  });

  it('getBreakConnectorIconId should return break-connector-icon-${this.componentId}-${index}', () => {
    expect(component.getBreakConnectorIconId(1)).toEqual(`break-connector-icon-${component.componentId}-1`);
  });

  it('getBreakSubConnectorLineId should return `break-sub-connector-line-${this.componentId}-${parentIndex}-${index}', () => {
    expect(component.getBreakSubConnectorLineId(1, 2)).toEqual(`break-sub-connector-line-${component.componentId}-1-2`);
  });

  it('getBreakSubConnectorIconId should return `break-sub-connector-icon-${this.componentId}-${parentIndex}-${index}', () => {
    expect(component.getBreakSubConnectorIconId(1, 2)).toEqual(`break-sub-connector-icon-${component.componentId}-1-2`);
  });

  it('breakConnector - index > 0 - should set connector to empty value', () => {
    const condition = new VisibilityCondition();
    component.breakConnector(condition, 1);
    expect(condition.connector).toEqual(EMPTY_VALUE);
  });

  it('breakConnector - index == 0 - should set not connector to empty value', () => {
    const condition = new VisibilityCondition();
    condition.connector = JoinOperatorEnum.And;
    component.breakConnector(condition, 0);
    expect(condition.connector).toEqual(JoinOperatorEnum.And);
  });

  it('getAndClass - connector = empty - should return require-connector', () => {
    expect(component.getAndClass('')).toEqual('require-connector');
  });

  it('getOrClass - connector = empty - should return require-connector', () => {
    expect(component.getOrClass('')).toEqual('require-connector');
  });

  it('getOrClass - connector = or - should return active-or', () => {
    expect(component.getOrClass(JoinOperatorEnum.Or)).toEqual('active-or');
  });

  it('getOrClass - connector != or should return empty', () => {
    expect(component.getOrClass(JoinOperatorEnum.And)).toEqual(EMPTY_VALUE);
  });

  it('getAndClass - connector = and - should return active-and', () => {
    expect(component.getAndClass(JoinOperatorEnum.And)).toEqual('active-and');
  });

  it('getAndClass - connector != and - should return empty', () => {
    expect(component.getAndClass(JoinOperatorEnum.Or)).toEqual(EMPTY_VALUE);
  });

  it('isHideConnectors - connector is AND - should return true', () => {
    expect(component.isHideConnectors(JoinOperatorEnum.And)).toEqual(true);
  });

  it('isHideConnectors - connector != AND - should return false', () => {
    expect(component.isHideConnectors(JoinOperatorEnum.Or)).toEqual(false);
  });

  it('shouldShouldBreakIcon - index = 0 - should return false', () => {
    expect(component.shouldShouldBreakIcon(0, JoinOperatorEnum.And)).toEqual(false);
  });

  it('shouldShouldBreakIcon - empty connector = 0 - should return false', () => {
    expect(component.shouldShouldBreakIcon(1, EMPTY_VALUE)).toEqual(false);
  });

  it('shouldShouldBreakIcon - index > 0 connector is not empty - should return true', () => {
    expect(component.shouldShouldBreakIcon(1, JoinOperatorEnum.And)).toEqual(true);
  });

  it('selected should set input value to empty', () => {
    const mockElementRef = {
      nativeElement: {
        blur: () => true,
        value: EMPTY_VALUE
      }
    } as ElementRef;
    component.inputTag = mockElementRef;
    const mockMatAutocomplete = jasmine.createSpyObj(MatAutocomplete.name, ['options']);
    const mockMatOption = jasmine.createSpyObj(MatOption.name, ['value']);
    const event = new MatAutocompleteSelectedEvent(mockMatAutocomplete, mockMatOption);
    mockMatOption.value = new VisibilityCondition();
    spyOn(component, 'onChangeConditions');
    component.selected(event);
    expect(component.onChangeConditions).toHaveBeenCalled();
  });

  it('deleteCondition - condition.isValid = TRUE - should be pushed to dropdownConditions', () => {
    const deletedCondition = new VisibilityCondition();
    deletedCondition.isValid = true;
    component.deletedConditions = [];
    component.deleteCondition(deletedCondition, component.selectedConditions);
    expect(component.dropdownConditions.length).toEqual(1);
  });

  it('deleteCondition - condition.isValid = FALSE - should NOT be pushed to dropdownConditions', () => {
    const deletedCondition = new VisibilityCondition();
    deletedCondition.isValid = false;
    component.deletedConditions = [];
    component.deleteCondition(deletedCondition, component.selectedConditions);
    expect(component.dropdownConditions.length).toEqual(0);
  });

  it('onDeleteCondition - condition have children - should open matDialog', () => {
    spyOn(dialog, 'open');
    const deleteCond = new VisibilityCondition();
    deleteCond.conditions = [new VisibilityCondition()];
    component.onDeleteCondition(deleteCond);
    expect(dialog.open).toHaveBeenCalled();
  });

  it('onDeleteCondition - condition have NOT children - should NOT open matDialog', () => {
    spyOn(dialog, 'open');
    component.onDeleteCondition(new VisibilityCondition());
    expect(dialog.open).not.toHaveBeenCalled();
  });

  it('onChangeSelectedConditions should emit selectedConditionsChange', () => {
    component.selectedConditions = [
      { id: 'sadasd' } as VisibilityCondition,
      { id: 'UserCond_111' } as VisibilityCondition,
    ];
    component.selectedConditionsChange.subscribe(condition => {
      expect(condition.length).toEqual(2);
    });
    component.onChangeConditions();
  });
});
