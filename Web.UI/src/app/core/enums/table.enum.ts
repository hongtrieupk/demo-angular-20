import { SortMeta } from 'primeng/api';

export const enum PrimengSortEnum {
  Desc = -1,
  Asc = 1,
  None = 0,
}

export type SortOptions = SortMeta & {
  sortDirection?: SortDirectionEnum;
};

export const enum SortDirectionEnum {
  Asc = 1,
  Desc = 2, // BE Enum should be update to -1 then we can remove this enum definition.
}
export const mapPrimengSortEnumToSortDirectionEnum = (
  order: PrimengSortEnum,
) => {
  return order === PrimengSortEnum.Asc
    ? SortDirectionEnum.Asc
    : order === PrimengSortEnum.Desc
      ? SortDirectionEnum.Desc
      : undefined;
};
export const DATE_FORMAT = 'MM/dd/yyyy';
