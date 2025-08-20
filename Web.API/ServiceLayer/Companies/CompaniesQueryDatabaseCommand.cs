using ServiceLayer.Common;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public class CompaniesQueryDatabaseCommand : BaseQueryDatabaseCommand<CompanyOveralDTO>
    {
        public CompaniesSearchCriteria criteria { get; set; }
        public CompaniesQueryDatabaseCommand()
        {
            criteria = new CompaniesSearchCriteria();
        }

        protected override IEnumerable<CompanyOveralDTO> BuildOrderCondition(IEnumerable<CompanyOveralDTO> data)
        {
            switch(criteria.SortField)
            {
                case nameof(CompanyOveralDTO.Name):
                    data = criteria.SortDirection == SortDirection.Asc ? data.OrderBy(x => x.Name) : data.OrderByDescending(x => x.Name);
                    break;
                case nameof(CompanyOveralDTO.OrgNumber):
                    data = criteria.SortDirection == SortDirection.Asc ? data.OrderBy(x => x.OrgNumber) : data.OrderByDescending(x => x.OrgNumber);
                    break;
                default:
                    break;
            }
            return data;
        }

        protected override IEnumerable<CompanyOveralDTO> BuildWhereCondition(IEnumerable<CompanyOveralDTO> data)
        {
            var whereCondition = "WHERE ";
            if (!string.IsNullOrEmpty(this.criteria.Name))
            {
                whereCondition = $"{whereCondition} Name Like('{this.criteria.Name}%')";
                data = data.Where(x => x.Name.Contains(this.criteria.Name, StringComparison.OrdinalIgnoreCase));
            }
            return data;
            // in reality could be return whereCondition
        }
    }
}