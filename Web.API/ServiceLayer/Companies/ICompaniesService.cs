using ServiceLayer.Common;
using ServiceLayer.Contacts;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public interface ICompaniesService
    {
        Task<PaginationResult<CompanyOveralDTO>> SearchCompanies(CompaniesSearchCriteria criteria, CancellationToken cancellationToken);
        Task<CompanyDTO> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<PaginationResult<ContactDTO>> SearchContacts(Guid compnayId, ContactSearchCriteria criteria, CancellationToken cancellationToken);
    }
}
