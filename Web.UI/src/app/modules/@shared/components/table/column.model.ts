import { TemplateRef } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';

export type ClickRowFn = <TRowData>(
    data: any,
    row: TRowData,
    rowIndex: number,
) => void;

/**
 * Built-in cell types
 */
export type CellType =
    | 'link'
    | 'checkbox'
    | 'date'
    | 'datetime'
    | 'email'
    | 'rawHtml'
    | 'action';

/**
 * Built-in cell editor types
 */
export type CellEditorType = 'text' | 'number' | 'date' | 'datetime' | 'select';

export type RawHtml = string;

/**
 * The inputs when {@link Column.cellType} is 'link'
 */
export type LinkInputs = {
    target?: '_blank' | '_parent' | '_self' | '_top';
    routerLink?: string;
    label?: string;
};

/**
 * The inputs when {@link Column.cellType} is 'checkbox'
 */
export type CheckboxInputs = {
    checked?: boolean;
    readonly?: boolean;
    onChanged?: (checked: boolean) => void;
};

/**
 * The inputs when {@link Column.cellType} is 'email'
 */
export type EmailInputs = {
    email?: string;
    onClickEmail?: ClickRowFn;
};

/**
 * The inputs when {@link Column.cellType} is 'action'
 */
export type ActionInputs = {
    label?: string;
    onClick?: ClickRowFn;
};

export type CellInputs =
    | CheckboxInputs
    | LinkInputs
    | EmailInputs
    | ActionInputs
    | Record<string, any>;

export type PropertyTypesOf<T> = {
    [P in keyof T]: T[P];
};
export type CellEditorInputs =
    | PropertyTypesOf<InputText>
    | PropertyTypesOf<InputNumber>
    | PropertyTypesOf<DatePicker>
    | PropertyTypesOf<Select>
    | Record<string, any>;

export type HorizontalAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'top' | 'center' | 'bottom';

export interface Column<TRowData> {
    title?: string;
    i18nTitleKey?: string | string[];
    classes?:
        | string
        | ((
              data: any,
              row: TRowData,
              rowIndex: number,
          ) => string | Record<string, boolean>);
    headerClasses?: string | (() => string | Record<string, boolean>);
    width?: string | number;
    maxWidth?: string | number;
    name?: string;
    dataKey?: keyof TRowData;
    cellType?: CellType;
    isFrozen?: boolean;
    alignFrozen?: HorizontalAlignment;
    bodyCell?: (
        data: any,
        row: TRowData,
        rowIndex: number,
    ) => RawHtml | TemplateRef<CellInputs> | null | undefined;
    bodyCellInputs?: (
        data: any,
        row: TRowData,
        rowIndex: number,
    ) => CellInputs | Record<string, any> | undefined | null;
    cellVerticalAlign?: VerticalAlignment;
    cellHorizontalAlign?: HorizontalAlignment;
    isSortable?: boolean;
    isEditable?: boolean;
    bodyCellEditor?:
        | CellEditorType
        | ((
              data: any,
              row: TRowData,
              rowIndex: number,
          ) => TemplateRef<CellEditorInputs> | null | undefined);
    bodyCellEditorInputs?: (
        data: any,
        row: TRowData,
        rowIndex: number,
    ) => CellEditorInputs | Record<string, any> | undefined | null;
    haveErrors?:
        | boolean
        | ((
              data: any,
              row: TRowData,
              rowIndex: number,
              rows: TRowData[],
          ) => boolean);
    errorMessage?:
        | string
        | ((
              data: any,
              row: TRowData,
              rowIndex: number,
              rows: TRowData[],
          ) => string);
}

export type Columns<TRowData> = Column<TRowData>[];
