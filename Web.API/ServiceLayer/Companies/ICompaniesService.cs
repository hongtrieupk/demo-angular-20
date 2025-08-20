using ServiceLayer.Common;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public interface ICompaniesService
    {
        Task<PaginationResult<CompanyOveralDTO>> SearchCompanies(CancellationToken cancellationToken);
    }
}
