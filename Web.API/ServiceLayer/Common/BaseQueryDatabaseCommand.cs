namespace ServiceLayer.Common
{
    public abstract class BaseQueryDatabaseCommand<T> where T : class
    {
        protected SearchCriteria searchCriteria { get; set; }

        protected BaseQueryDatabaseCommand()
        {
            this.searchCriteria = new SearchCriteria();
        }

        /// <summary>
        /// Fake data from BE for now, so passing the list data to test
        /// In reality data will be query from the Database
        /// </summary>
        /// <returns></returns>
        public async Task<PaginationResult<T>> Execute(IEnumerable<T> data, SearchCriteria searchCriteria)
        {
            this.searchCriteria = searchCriteria;
            data = BuildWhereCondition(data);
            data = BuildOrderCondition(data);
            var result = await this.Paginate(data);
            return await Task.FromResult(result);
        }
        private async Task<PaginationResult<T>> Paginate(IEnumerable<T> data)
        {
            int total = data.Count();
            var paginatedItems = data.Skip((this.searchCriteria.PageNumber - 1) * this.searchCriteria.PageSize).Take(this.searchCriteria.PageSize);
            var result = new PaginationResult<T>()
            {
                Items = paginatedItems,
                TotalItemCount = total,
                PageNumber = this.searchCriteria.PageNumber,
                PageSize = this.searchCriteria.PageSize
            };
            return await Task.FromResult(result);
        }

        /// <summary>
        /// Fake data from BE for now, so passing the list data to test
        /// In reality this function will return a string or any kind of order/where condition before query data from the source database
        /// </summary>
        /// <returns></returns>
        protected abstract IEnumerable<T> BuildOrderCondition(IEnumerable<T> data);
        protected abstract IEnumerable<T> BuildWhereCondition(IEnumerable<T> data);
    }
}
