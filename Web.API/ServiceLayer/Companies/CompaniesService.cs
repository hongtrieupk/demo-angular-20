using ServiceLayer.Common;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public class CompaniesService : ICompaniesService
    {
        private CompaniesQueryDatabaseCommand _queryCompaniesCommand;

        public CompaniesService()
        {
            _queryCompaniesCommand = new CompaniesQueryDatabaseCommand();
        }

        public async Task<PaginationResult<CompanyOveralDTO>> GetCompanies(CompaniesSearchCriteria criteria, CancellationToken cancellationToken)
        {
            _queryCompaniesCommand.criteria = criteria;
            var result = await _queryCompaniesCommand.Execute(mockCompanies, criteria);
            return await Task.FromResult(result);
        }




        private readonly IEnumerable<CompanyOveralDTO> mockCompanies = new List<CompanyOveralDTO>
        {
            new() {
                Id = Guid.NewGuid(),
                OrgNumber = "ORG 001",
                Name = "Apple",
                Web = "www.apple.com"
            },
            new() {
                Id = Guid.NewGuid(),
                OrgNumber = "ORG 002",
                Name = "Google",
                Web = "www.google.com"
            }
        };
    }
}
