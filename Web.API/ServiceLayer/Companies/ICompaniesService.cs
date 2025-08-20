using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public interface ICompaniesService
    {
        Task<IEnumerable<CompanyOveralDTO>> SearchCompany(CancellationToken cancellationToken);
    }
}
