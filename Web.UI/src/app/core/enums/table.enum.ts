import { SortMeta } from 'primeng/api';

export const enum PrimengSortEnum {
  Desc = -1,
  Asc = 1,
  None = 0,
}

export type SortOptions = SortMeta & {
  sortDirection?: PrimengSortEnum;
};
export const DATE_FORMAT = 'MM/dd/yyyy';
