namespace ServiceLayer.Common
{
    public  class PaginationResult<T>
    {
        /// <summary>
        /// Page number, starting from 1, it not zero-based.
        /// </summary>
        public int PageNumber { get; set; }
        /// <summary>
        /// Page size, the number of items per page. default is 50.
        /// </summary>
        public int PageSize { get; set; } = 50;
        /// <summary>
        /// Total item count in the collection.
        /// </summary>
        public int TotalItemCount { get; set; }
        /// <summary>
        /// Total number of pages in the collection.
        /// </summary>
        public int TotalPages { get; set; }
        /// <summary>
        /// The items in the current page.
        /// </summary>
        public IEnumerable<T>? Items { get; set; }
    }
}
