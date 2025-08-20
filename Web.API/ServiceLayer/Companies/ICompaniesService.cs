using ServiceLayer.Common;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public interface ICompaniesService
    {
        Task<PaginationResult<CompanyOveralDTO>> GetCompanies(CompaniesSearchCriteria criteria, CancellationToken cancellationToken);
    }
}
