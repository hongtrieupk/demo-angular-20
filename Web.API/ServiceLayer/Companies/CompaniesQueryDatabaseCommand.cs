using ServiceLayer.Common;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public class CompaniesQueryDatabaseCommand : BaseQueryDatabaseCommand<CompanyOveralDTO>
    {
        public CompaniesSearchCriteria companiesCriteria { get; set; }
        public CompaniesQueryDatabaseCommand()
        {
            companiesCriteria = new CompaniesSearchCriteria();
        }

        protected override IEnumerable<CompanyOveralDTO> BuildOrderCondition(IEnumerable<CompanyOveralDTO> data)
        {
            switch(companiesCriteria.SortField)
            {
                case nameof(CompanyOveralDTO.Name):
                    data = companiesCriteria.SortDirection == SortDirection.Asc ? data.OrderBy(x => x.Name) : data.OrderByDescending(x => x.Name);
                    break;
                case nameof(CompanyOveralDTO.OrgNumber):
                    data = companiesCriteria.SortDirection == SortDirection.Asc ? data.OrderBy(x => x.OrgNumber) : data.OrderByDescending(x => x.OrgNumber);
                    break;
                default:
                    break;
            }
            return data;
        }

        protected override IEnumerable<CompanyOveralDTO> BuildWhereCondition(IEnumerable<CompanyOveralDTO> data)
        {
            var whereCondition = "WHERE ";
            if (!string.IsNullOrEmpty(companiesCriteria.Name))
            {
                whereCondition = $"{whereCondition} Name Like('{companiesCriteria.Name}%')";
                data = data.Where(x => x.Name.Contains(companiesCriteria.Name, StringComparison.OrdinalIgnoreCase));
            }
            return data;
            // in reality could be return whereCondition as a string
        }
    }
}