using ServiceLayer.Common;
using ServiceLayer.Contacts;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public class CompaniesService : ICompaniesService
    {
        public async Task<PaginationResult<CompanyOveralDTO>> SearchCompanies(CompaniesSearchCriteria criteria, CancellationToken cancellationToken)
        {
            var queryCompaniesCommand = new CompaniesQueryDatabaseCommand();
            queryCompaniesCommand.companiesCriteria = criteria;
            var result = await queryCompaniesCommand.Execute(MockDatabase.mockCompanies, criteria);
            return await Task.FromResult(result);
        }
        public async Task<CompanyDTO> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var company = MockDatabase.mockCompanies.FirstOrDefault(x => x.Id == id);
            if (company == null)
            {
                throw new ArgumentNullException("Company doesn't exist");
            }
            var companyInfo = new CompanyDTO
            {
                Id = id,
                Name = company.Name,
                OrgNumber = company.OrgNumber,
                Web = company.Web,
                ErpNumber = "Test Erp Numer ",
                Comment = $"{company.Name} This is an important infor section.....",
                Email = $"{company.Name}@mail.com",
                PrimaryResponsibleName = $"{company.Name} + first name",
                SecondaryResponsibleName = $"{company.Name} + second name"
            };
            return await Task.FromResult<CompanyDTO>(companyInfo);
        }


        public async Task<PaginationResult<ContactDTO>> SearchContacts(Guid compnayId, ContactSearchCriteria criteria, CancellationToken cancellationToken)
        {
            var contactQueryCommand = new ContactsQueryDatabaseCommand();
            contactQueryCommand.contactCriteria = criteria;
            contactQueryCommand.contactCriteria.CompanyId = compnayId;
            var result = await contactQueryCommand.Execute(MockDatabase.mockContacts, criteria);
            return await Task.FromResult(result);
        }
    }
}
