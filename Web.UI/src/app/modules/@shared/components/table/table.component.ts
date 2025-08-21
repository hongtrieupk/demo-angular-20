import {
  CommonModule,
  DATE_PIPE_DEFAULT_OPTIONS,
  DatePipe,
  DatePipeConfig,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import {
  TableHeaderCheckboxToggleEvent,
  TableModule,
  TableSelectAllChangeEvent,
} from 'primeng/table';
import {
  CellInputs,
  CheckboxInputs,
  Column,
  Columns,
  EmailInputs,
  LinkInputs,
} from './column.model';
import { TranslateModule, TranslateService, _ } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { filter, indexOf, isArray, map, some } from 'lodash';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SortMeta } from 'primeng/api';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { I18nDirective } from '../../directives/i18n.directive';
import { isValid, parse, parseISO } from 'date-fns';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { SortOptions } from '../../../../core/enums/table.enum';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    CheckboxModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    FormsModule,
    MultiSelectModule,
    PaginatorModule,
    TranslateModule,
    I18nDirective,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class TableComponent<TRowData> {
  /**
   * inputs
   */
  name = input.required<string>();
  columns = input.required<Column<TRowData>[]>();
  loading = input<boolean>(false);
  scrollable = input<boolean>(false);
  isFrozenActionButton = input<boolean>(false);
  alignFrozenActionButton = input<string>('right');
  size = input<'small' | 'large'>('small');
  scrollHeight = input<string>();
  data = input<TRowData[]>();
  showColumnHeader = input<boolean>(true);
  showColumnsSelection = input<boolean>(true);
  showActionColumn = input<boolean>(true);
  stripedRows = input<boolean>(false);
  totalRecords = input<number>();
  page = input<number>(0); // page start from 0
  first = computed(() => this.page() * this.rows());
  defaultRowsPerPageOptions = [1, 5, 10, 20, 50, 100, 200];
  defaultRowsPerPage = 5;
  rows = input<number>(this.defaultRowsPerPage);
  rowsPerPageOptions = input<number[]>(this.defaultRowsPerPageOptions);
  showPaginator = input<boolean>(true);
  showJumpToPageInput = input<boolean>(false);

  showEditButton = input<boolean>(false);
  showDeleteButton = input<boolean>(false);
  showGiftButton = input<boolean>(false);
  showLeftButton = input<boolean>(false);
  showRightButton = input<boolean>(false);

  sortMode = input<'single' | 'multiple'>('single');
  sortByClient = input<boolean>(false);
  lazy = input<boolean>(true);
  rowHover = input<boolean>(true);
  dataKey = input<string>();
  rowClasses = input<
    | string
    | ((row: TRowData, rowIndex: number) => string | Record<string, boolean>)
  >();

  /**
   * output
   */
  onClickedEditButton = output<TRowData>();
  onClickedDeleteButton = output<TRowData>();
  onClickedGiftButton = output<TRowData>();
  onClickedLeftButton = output<TRowData>();
  onClickedRightButton = output<TRowData>();
  onPageChange = output<PaginatorState>();

  onHeaderCheckboxToggle = output<TableHeaderCheckboxToggleEvent>();
  onSelectAllChange = output<TableSelectAllChangeEvent>();
  onSelectionChange = output<any>();
  onSort = output<SortOptions>();
  onColumnsSelectionChange = output<Columns<TRowData>>();

  //#region Templates
  actionButtonsTemplateRef = contentChild<TemplateRef<any>>('actionButtons');
  footerTemplateRef = contentChild<TemplateRef<any>>('tableFooter');
  cellTemplateRefCheckbox = viewChild.required<TemplateRef<CheckboxInputs>>(
    'cellTemplateCheckbox',
  );
  cellTemplateRefEmail =
    viewChild.required<TemplateRef<EmailInputs>>('cellTemplateEmail');

  cellTemplateRefLink =
    viewChild.required<TemplateRef<LinkInputs>>('cellTemplateLink');

  bodyCellTemplateRawHtml = viewChild.required<TemplateRef<any>>(
    'cellTemplateRawHtml',
  );
  bodyCellTemplateOnClick =
    viewChild.required<TemplateRef<CellInputs>>('actionCellTemplate');

  bodyCellTemplateRefDefault: any = viewChild.required<TemplateRef<any>>(
    'cellTemplateDefault',
  );
  bodyCellTemplateRef = contentChild<TemplateRef<any>>('bodyCell');
  emptyMessageTemplateRef = contentChild<TemplateRef<any>>('emptyMessage');

  //#endregion Templates

  selectedColumns: Column<TRowData>[] = [];
  private datePipe = inject(DatePipe);
  private datePipeDefaultOptions: DatePipeConfig & { dateTimeFormat?: string } =
    inject(DATE_PIPE_DEFAULT_OPTIONS);
  private translateService = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);
  selectedRows = model<TRowData[]>();

  constructor() {
    this.translateService.onLangChange.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.selectedColumns = this.columns();
  }
  getCellTemplateOutlet(
    row: TRowData,
    column: Column<TRowData>,
  ): TemplateRef<CellInputs> {
    const rowIndex = indexOf(this.data(), row);

    if (column.cellType === 'link') {
      return this.cellTemplateRefLink();
    }

    if (column.cellType === 'checkbox') {
      return this.cellTemplateRefCheckbox();
    }

    if (column.cellType === 'email') {
      return this.cellTemplateRefEmail();
    }

    if (column.cellType === 'rawHtml') {
      return this.bodyCellTemplateRawHtml();
    }
    if (column.cellType === 'action') {
      return this.bodyCellTemplateOnClick();
    }

    /**
     * Get cell template, the template get by order:
     * - {@link Column.bodyCell}
     * - template #cellTemplate
     */
    const bodyCellTemplateRef =
      column.bodyCell?.(
        column.dataKey ? row[column.dataKey] : null,
        row,
        rowIndex,
      ) ?? this.bodyCellTemplateRef();

    return bodyCellTemplateRef ?? this.bodyCellTemplateRefDefault();
  }

  getCellTemplateOutletContext(
    row: TRowData,
    column: Column<TRowData>,
  ): CellInputs | Record<string, any> {
    const rowIndex = indexOf(this.data(), row);
    const columnIndex = indexOf(this.columns(), column);

    return {
      $implicit: row,
      data: this.getDataByKey(row, column),
      row: row,
      rowIndex: rowIndex,
      column: column,
      columnIndex: columnIndex,
      ...this.getCellInputs(row, column),
    };
  }

  getRowTemplateOutletContext(row: TRowData) {
    const rowIndex = indexOf(this.data(), row);
    return {
      $implicit: row,
      row: row,
      rowIndex: rowIndex,
      columnCount: this.columns().length,
      totalColumnCount: this.getTotalColumnCount(),
    };
  }

  getTotalColumnCount() {
    return (
      this.columns().length +
      (this.showActionColumn() || this.showColumnsSelection() ? 1 : 0)
    );
  }

  getDataByKey(row: TRowData, column: Column<TRowData>) {
    return column.dataKey ? row[column.dataKey] : null;
  }

  getDataByKeyAsString(row: TRowData, column: Column<TRowData>) {
    return this.getDataByKey(row, column) as string | null;
  }

  getCellInputs(row: TRowData, column: Column<TRowData>) {
    const rowIndex = indexOf(this.data(), row);
    return column.bodyCellInputs?.(
      this.getDataByKey(row, column),
      row,
      rowIndex,
    );
  }

  getCellInputsAs<T>(row: TRowData, column: Column<TRowData>) {
    const rowIndex = indexOf(this.data(), row);
    return column.bodyCellInputs?.(
      this.getDataByKey(row, column),
      row,
      rowIndex,
    ) as T;
  }

  getEmail(row: TRowData, column: Column<TRowData>) {
    return (
      this.getCellInputsAs<EmailInputs>(row, column)?.email ??
      this.getDataByKey(row, column)
    );
  }

  getDefaultCellContent(row: TRowData, column: Column<TRowData>) {
    if (column.cellType === 'date') {
      const data = this.getDataByKey(row, column);
      if (data instanceof Date) {
        return this.datePipe.transform(data);
      }
      if (typeof data === 'string') {
        return this.datePipe.transform(tryConvertToDate(data));
      }
      return null;
    }

    if (column.cellType === 'datetime') {
      const dateTimeFormat = this.datePipeDefaultOptions.dateTimeFormat;
      const data = this.getDataByKey(row, column);
      if (data instanceof Date) {
        return this.datePipe.transform(data, dateTimeFormat);
      }
      if (typeof data === 'string') {
        return this.datePipe.transform(tryConvertToDate(data), dateTimeFormat);
      }
      return null;
    }

    return this.getDataByKey(row, column);
  }

  getRawHtmlCellContent(row: TRowData, column: Column<TRowData>): SafeHtml {
    const rowIndex = indexOf(this.data(), row);
    const htmlContent =
      column.bodyCell?.(this.getDataByKey(row, column), row, rowIndex) ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent.toString());
  }

  isColumnSortable(column: Column<TRowData>) {
    return column.isSortable;
  }

  handleSort(sort: SortMeta) {
    this.onSort.emit({
      ...sort,
      sortDirection: sort.order,
    });
  }

  handleColumnsSelectionChange(selectedColumns: Column<TRowData>[]) {
    this.updateSelectedColumns(selectedColumns);
    this.onColumnsSelectionChange.emit(selectedColumns);
  }

  private updateSelectedColumns(selectedColumns: Column<TRowData>[]) {
    this.selectedColumns = filter(this.columns(), (column: Column<TRowData>) =>
      some(
        selectedColumns,
        (selectedColumn: Column<TRowData>) =>
          selectedColumn.dataKey === column.dataKey,
      ),
    );
  }

  getColumnTitle(column: Column<TRowData>) {
    return (
      column.title ??
      (typeof column.i18nTitleKey === 'string'
        ? this.translateService.instant(column.i18nTitleKey)
        : isArray(column.i18nTitleKey)
          ? map(column.i18nTitleKey, (key: string) =>
              this.translateService.instant(key),
            ).join(' ')
          : '')
    );
  }

  getRowClasses(row: TRowData, rowIndex: number) {
    const rowClasses = this.rowClasses();
    if (typeof rowClasses === 'string') {
      return rowClasses;
    }

    if (typeof rowClasses === 'function') {
      return rowClasses(row, rowIndex);
    }

    return null;
  }

  getColumnClasses(rowData: TRowData, column: Column<TRowData>) {
    const columnClasses = column.classes;
    if (typeof columnClasses === 'string') {
      return columnClasses;
    }

    if (typeof columnClasses === 'function') {
      return columnClasses(
        this.getDataByKey(rowData, column),
        rowData,
        indexOf(this.data(), rowData),
      );
    }

    return null;
  }

  getColumnHeaderClasses(column: Column<TRowData>) {
    const columnHeaderClasses = column.headerClasses;
    if (typeof columnHeaderClasses === 'string') {
      return columnHeaderClasses;
    }

    if (typeof columnHeaderClasses === 'function') {
      return columnHeaderClasses();
    }

    return null;
  }
}

/**
 * Some APIs can received the formatted date with locale,
 */
const tryConvertToDate = (dateString: string): Date => {
  let date = parseISO(dateString);
  if (isValid(date)) {
    return date;
  }

  date = parse(dateString, 'MM/dd/yyyy HH:mm:ss', new Date()); // english format
  if (isValid(date)) {
    return date;
  }

  date = parse(dateString, 'dd.MM.yyyy HH:mm:ss', new Date()); // norway format
  if (isValid(date)) {
    return date;
  }

  return new Date();
};
