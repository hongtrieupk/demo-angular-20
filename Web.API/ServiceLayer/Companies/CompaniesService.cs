using ServiceLayer.Common;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public class CompaniesService : ICompaniesService
    {
        public async Task<PaginationResult<CompanyOveralDTO>> SearchCompanies(CancellationToken cancellationToken)
        {
            var items = new List<CompanyOveralDTO>
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
            var result = new PaginationResult<CompanyOveralDTO>()
            {
                Items = items,
                TotalItemCount = items.Count,
                PageNumber = 1,
                PageSize = 10,
            };
            return await Task.FromResult(result);
        }
    }
}
