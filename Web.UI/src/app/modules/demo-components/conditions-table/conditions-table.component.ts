import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'primeng/basecomponent';
import {
  EMPTY_VALUE,
  VisibilityCondition,
} from '../models/visibility-condition.model';
import { FieldCondition } from '../models/condition-definition-interface';
import {
  BetweenOperatorEnum,
  JoinOperatorEnum,
  MultipleValueOperatorEnum,
  NoValueOperatorEnum,
  SingleValueOperatorEnum,
} from '../condition-form/enum/operator.enum';
import { isNotEmptyArray } from '../models/array.util';
import { ConditionFormComponent } from '../condition-form/condition-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  DateTimeTypeEnum,
  DropdownListTypeEnum,
  FreeInputTypeEnum,
} from '../condition-form/enum/field-type.enum';

@Component({
  selector: 'app-conditions-table',
  templateUrl: './conditions-table.component.html',
  styleUrls: ['./conditions-table.component.scss'],
  imports: [
    ConditionFormComponent,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    MatAutocompleteModule,
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class ConditionsTableComponent
  extends BaseComponent
  implements OnInit, AfterViewChecked
{
  @Output() selectedConditionsChange = new EventEmitter<
    VisibilityCondition[]
  >();
  @Input() selectedConditions: VisibilityCondition[] = [];

  fields: FieldCondition[] = [
    {
      id: 'title',
      value: 'Title',
      type: FreeInputTypeEnum.Text,
      operators: [
        {
          id: SingleValueOperatorEnum.Like,
          value: 'Contains',
        },
        {
          id: SingleValueOperatorEnum.Equal,
          value: '=',
        },
        {
          id: SingleValueOperatorEnum.NotEqual,
          value: '!=',
        },
        {
          id: NoValueOperatorEnum.IsNull,
          value: 'Is Null',
        },
        {
          id: NoValueOperatorEnum.IsNotNull,
          value: 'Not Null',
        },
      ],
      values: [],
      multiple: false,
    },
    {
      id: 'status',
      value: 'Status',
      type: DropdownListTypeEnum.PickList,
      operators: [
        {
          id: SingleValueOperatorEnum.Equal,
          value: '=',
        },
        {
          id: SingleValueOperatorEnum.NotEqual,
          value: '!=',
        },
        {
          id: MultipleValueOperatorEnum.In,
          value: 'In',
        },
        {
          id: MultipleValueOperatorEnum.NotIn,
          value: 'Not In',
        },
      ],
      values: ['In progress', 'Done', 'New'],
      multiple: true,
    },
    {
      id: 'publishDate',
      value: 'Publish Date',
      type: DateTimeTypeEnum.Date,
      operators: [
        {
          id: BetweenOperatorEnum.Between,
          value: 'Between',
        },
        {
          id: SingleValueOperatorEnum.Equal,
          value: '=',
        },
      ],
      values: [],
      multiple: false,
    },
    {
      id: 'price',
      value: 'Price',
      type: FreeInputTypeEnum.Number,
      operators: [
        {
          id: SingleValueOperatorEnum.GreaterThan,
          value: '>',
        },
        {
          id: SingleValueOperatorEnum.GreaterThanEqual,
          value: '>=',
        },
        {
          id: SingleValueOperatorEnum.LessThan,
          value: '<',
        },
        {
          id: SingleValueOperatorEnum.LessThanEqual,
          value: '=<',
        },
      ],
      values: [],
      multiple: false,
    },
  ];
  optionControl = new FormControl();
  deletedConditions: VisibilityCondition[] = [];
  dropdownConditions: VisibilityCondition[] = [];

  @ViewChild('inputTag')
  inputTag!: ElementRef<HTMLInputElement>;

  componentId: string = Date.now().toString();

  constructor(public translate: TranslateService) {
    super();
  }

  ngAfterViewChecked(): void {
    this.clearConnectorLines();
    this.drawConnectorLines();
  }

  override ngOnInit(): void {
    this.optionControl.valueChanges.subscribe((value) => {
      this.dropdownConditions = this.filter(value);
    });
  }

  onChangeConditions(): void {
    if (this.selectedConditions.length > 0) {
      this.selectedConditions[0].connector = EMPTY_VALUE;
    }
    this.selectedConditionsChange.emit(this.selectedConditions);
  }

  onDeleteCondition(cond: VisibilityCondition): void {
    if (!cond.conditions.length) {
      this.deleteCondition(cond, this.selectedConditions);
      return;
    }
    this.deleteCondition(cond, this.selectedConditions);
  }

  addSubCondition(index: number): void {
    if (
      index < 1 ||
      this.selectedConditions.length < 2 ||
      this.selectedConditions[index].conditions.length > 0
    ) {
      return;
    }
    const previousCondition = this.selectedConditions[index - 1];
    previousCondition.conditions.push(this.selectedConditions[index]);
    // set default 'and' connector for top-root subcondition in the list
    previousCondition.conditions[0].connector = JoinOperatorEnum.And;
    this.selectedConditions.splice(index, 1);
    this.onChangeConditions();
  }

  removeSubCondition(index: number, parent: VisibilityCondition): void {
    const subCondition = parent.conditions[index];
    parent.conditions.splice(index, 1);
    if (parent.conditions.length) {
      parent.conditions[0].connector = JoinOperatorEnum.And;
    }
    const parentIndex = this.selectedConditions.indexOf(parent);
    this.selectedConditions.splice(parentIndex + 1, 0, subCondition);
    this.onChangeConditions();
  }

  createLastCondition(): void {
    this.selectedConditions.push(new VisibilityCondition());
  }

  insertNewCondition(
    conditions: VisibilityCondition[],
    currentCondition: VisibilityCondition,
  ): void {
    const currentIndex = conditions.indexOf(currentCondition);
    conditions.splice(currentIndex + 1, 0, new VisibilityCondition());
    this.onChangeConditions();
  }

  deleteCondition(
    condition: VisibilityCondition,
    from: VisibilityCondition[],
  ): void {
    from.splice(from.indexOf(condition), 1);
    if (condition.isValid) {
      this.deletedConditions.push(condition);
      this.dropdownConditions = this.deletedConditions.slice();
    }
    this.onChangeConditions();
  }

  animationDone(): void {
    this.clearConnectorLines();
    this.drawConnectorLines();
  }

  deleteSubCondition(
    condition: VisibilityCondition,
    parent: VisibilityCondition,
  ): void {
    this.deleteCondition(condition, parent.conditions);
  }

  onAndCondition(
    condition: VisibilityCondition,
    connectorHtml: HTMLSpanElement,
  ): void {
    condition.connector = JoinOperatorEnum.And;
    connectorHtml.className = 'active-and';
    this.onChangeConditions();
  }

  onOrCondition(condition: VisibilityCondition): void {
    condition.connector = JoinOperatorEnum.Or;
    this.onChangeConditions();
  }

  breakConnector(condition: VisibilityCondition, index: number): void {
    if (index === 0) {
      return;
    }
    condition.connector = EMPTY_VALUE;
    this.onChangeConditions();
  }

  showAddSubCondtionIcon(condition: VisibilityCondition): boolean {
    return !isNotEmptyArray(condition.conditions);
  }

  getOrClass(connector: string): string {
    if (!connector) {
      return 'require-connector';
    }
    return connector === JoinOperatorEnum.Or ? 'active-or' : EMPTY_VALUE;
  }

  getAndClass(connector: string): string {
    if (!connector) {
      return 'require-connector';
    }
    return connector === JoinOperatorEnum.And ? 'active-and' : EMPTY_VALUE;
  }

  isHideConnectors(connector: string): boolean {
    return connector === JoinOperatorEnum.And;
  }

  shouldShouldBreakIcon(index: number, connector: string): boolean {
    return index !== 0 && !!connector;
  }

  getConnectorLineClass(): string {
    return 'line-connectors ' + this.componentId;
  }

  getBreakConnectorLineId(index: number): string {
    return `break-connector-line-${this.componentId}-${index}`;
  }

  getBreakConnectorIconId(index: number): string {
    return `break-connector-icon-${this.componentId}-${index}`;
  }

  getBreakSubConnectorLineId(parentIndex: number, index: number): string {
    return `break-sub-connector-line-${this.componentId}-${parentIndex}-${index}`;
  }

  getBreakSubConnectorIconId(parentIndex: number, index: number): string {
    return `break-sub-connector-icon-${this.componentId}-${parentIndex}-${index}`;
  }

  showBreakConnectorIcon(
    conditions: VisibilityCondition[],
    index: number,
  ): boolean {
    if (conditions[index].connector === JoinOperatorEnum.And && index > 0) {
      return true;
    }
    let nextConnector = EMPTY_VALUE;
    if (conditions.length > index + 1) {
      nextConnector = conditions[index + 1].connector;
    }
    return nextConnector === JoinOperatorEnum.And;
  }

  drawConnectorLines(): void {
    const countCond = this.selectedConditions.length;
    for (let i = 0; i < countCond; i++) {
      this.drawConnectorLinesForSubCondition(
        this.selectedConditions[i].conditions,
        i,
      );
      if (
        i < countCond - 1 &&
        this.selectedConditions[i + 1].connector === JoinOperatorEnum.And
      ) {
        const line = document.getElementById(this.getBreakConnectorLineId(i));
        const currentIcon = document.getElementById(
          this.getBreakConnectorIconId(i),
        );
        const nextIcon = document.getElementById(
          this.getBreakConnectorIconId(i + 1),
        );
        this.drawAConnectorLine(line, nextIcon, currentIcon);
      }
    }
  }

  drawConnectorLinesForSubCondition(
    subConditions: VisibilityCondition[],
    parentIndex: number,
  ): void {
    for (let j = 0; j < subConditions.length - 1; j++) {
      if (subConditions[j + 1].connector !== JoinOperatorEnum.And) {
        continue;
      }
      const line = document.getElementById(
        this.getBreakSubConnectorLineId(parentIndex, j),
      );
      const nextIcon = document.getElementById(
        this.getBreakSubConnectorIconId(parentIndex, j + 1),
      );
      const currentIcon = document.getElementById(
        this.getBreakSubConnectorIconId(parentIndex, j),
      );
      this.drawAConnectorLine(line, nextIcon, currentIcon);
    }
  }

  drawAConnectorLine(
    line: HTMLElement | null,
    previousIcon: HTMLElement | null,
    currentIcon: HTMLElement | null,
  ): void {
    if (!previousIcon || !currentIcon || !line) {
      return;
    }
    const x1 = previousIcon.offsetLeft + previousIcon.clientWidth / 3.3;
    const y1 = previousIcon.offsetTop + previousIcon.clientHeight / 3.6;
    const x2 = currentIcon.offsetLeft + currentIcon.clientWidth / 3.3;
    const y2 = currentIcon.offsetTop + currentIcon.clientHeight / 1.6;

    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
  }

  clearConnectorLines(): void {
    const lines = document.getElementsByClassName(this.getConnectorLineClass());
    /* tslint:disable-next-line */
    for (let i = 0; i < lines.length; i++) {
      lines[i].setAttribute('x1', '0');
      lines[i].setAttribute('y1', '0');
      lines[i].setAttribute('x2', '0');
      lines[i].setAttribute('y2', '0');
    }
  }

  selected(event: any): void {
    const condition = event.option.value;
    this.selectedConditions.push(condition);
    const index = this.deletedConditions.indexOf(condition);
    this.deletedConditions.splice(index, 1);
    this.optionControl.setValue('');
    this.inputTag.nativeElement.blur();
    this.onChangeConditions();
  }

  filter(filter: string | VisibilityCondition): any[] {
    if (typeof filter === 'string' && !!filter) {
      return this.deletedConditions.filter(
        (opt) =>
          opt.getDisplayCondition.toLowerCase().indexOf(filter.toLowerCase()) >=
          0,
      );
    }
    return this.deletedConditions.slice();
  }
}
