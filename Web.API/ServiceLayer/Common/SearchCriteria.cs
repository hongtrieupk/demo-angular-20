namespace ServiceLayer.Common
{
    public class SearchCriteria
    {
        /// <summary>
        /// items for a page, default 50
        /// </summary>
        public int PageSize { get; set; } = 50;
        /// <summary>
        /// page number, default 1
        /// </summary>
        public int PageNumber { get; set; } = 1;
        /// <summary>
        /// sorting, example: companies?sortDirection=asc
        /// </summary>
        public SortDirection SortDirection { get; set; } = SortDirection.Asc;

        /// <summary>
        /// sorting, example: companies?sortField=name
        /// </summary>
        public string? SortField { get; set; }
    }
    public enum SortDirection
    {
        Asc = 1,
        Desc = -1
    }
}
