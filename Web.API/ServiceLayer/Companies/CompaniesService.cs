using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public class CompaniesService : ICompaniesService
    {
        public async Task<IEnumerable<CompanyOveralDTO>> SearchCompany(CancellationToken cancellationToken)
        {
            return await Task.FromResult(new List<CompanyOveralDTO>
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
            });
        }
    }
}
