import { PrimengSortEnum } from "../enums/table.enum";

export interface PaginationResult<T> {
    pageNumber?: number;
    pageSize?: number;
    totalItemCount: number;
    totalPages?: number;
    items: T[];
}
export interface PagingOptions {
    pageSize?: number;
    pageNumber?: number;
    sortDirection?: PrimengSortEnum;
    sortField?: string;
}
