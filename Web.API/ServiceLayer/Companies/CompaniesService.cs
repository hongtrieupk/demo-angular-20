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
        public async Task<CompanyDTO> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var company = mockCompanies.FirstOrDefault(x => x.Id == id);
            if (company == null)
            {
                throw new ArgumentNullException("Company is not existed");
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



        private readonly IEnumerable<CompanyOveralDTO> mockCompanies = new List<CompanyOveralDTO>
        {
            new() {
                Id = new Guid("2580f04d-45c8-494d-b09d-7aa55232cfe9"),
                OrgNumber = "ORG 001",
                Name = "Apple",
                Web = "www.apple.com"
            },
            new() {
                Id = new Guid("ea18c53a-e9cf-4449-a59b-819f3056c843"),
                OrgNumber = "ORG 002",
                Name = "Google",
                Web = "www.google.com"
            },
            new() {
                Id = new Guid("9bee915b-32bd-408d-bec9-15f730583d06"),
                OrgNumber = "ORG 003",
                Name = "Facebook",
                Web = "www.Facebook.com"
            },
            new() {
                Id = new Guid("80eee262-1a60-4db1-ad9a-c725f3d7a542"),
                OrgNumber = "ORG 004",
                Name = "Titok",
                Web = "www.Titok.com"
            },
            new() {
                Id = new Guid("2661cf00-455f-479c-b1af-4497e8d31e8f"),
                OrgNumber = "ORG 005",
                Name = "Microsoft",
                Web = "www.Microsoft.com"
            },
            new() {
                Id = new Guid("bf9053a4-19a5-4c9b-80e0-cffa6538e4fe"),
                OrgNumber = "ORG 006",
                Name = "AWS",
                Web = "www.aws.com"
            },
            new() {
                Id = new Guid("b4befbb6-ec95-462c-850c-47a63beca32d"),
                OrgNumber = "ORG 007",
                Name = "Yahoo",
                Web = "www.Yahoo.com"
            },
            new() {
                Id = new Guid("c826fcf6-2ab8-4a1e-9ec8-67a4f94a4414"),
                OrgNumber = "ORG 008",
                Name = "Peugeot",
                Web = "www.Peugeot.com"
            },
            new() {
                Id = new Guid("5235632e-0eb8-4ee6-b7f8-ba9fb7049626"),
                OrgNumber = "ORG 009",
                Name = "Fujifilm",
                Web = "www.Fujifilm.com"
            },
            new() {
                Id = new Guid("c92cf776-9cb6-4ab8-b448-1fcc2923a82f"),
                OrgNumber = "ORG 010",
                Name = "Canon",
                Web = "www.canon.com"
            },
            new() {
                Id = new Guid("de086e8e-90ba-43b7-a58b-ec9764b07568"),
                OrgNumber = "ORG 011",
                Name = "Honda",
                Web = "www.honda.com"
            },
            new() {
                Id = new Guid("77f61515-0d67-4ce3-a4cb-569e57f7d2d1"),
                OrgNumber = "ORG 012",
                Name = "BMW",
                Web = "www.bmw.com"
            },
            new() {
                Id = new Guid("4fa9755a-bbbe-48f1-a962-e14486a0200c"),
                OrgNumber = "ORG 013",
                Name = "General Moto",
                Web = "www.generalmoto.com"
            },
            new() {
                Id = new Guid("bc7c4229-0f90-4e48-a94a-8da25d0794e9"),
                OrgNumber = "ORG 014",
                Name = "Dell",
                Web = "www.dell.com"
            }
        };
    }
}
