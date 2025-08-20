using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Common;
using ServiceLayer.Companies;
using ServiceLayer.Contacts;
using ServiceLayer.DTOs;

namespace Web.API.Controllers.v1
{
    [Route("api/v{version:apiVersion}/companies")]
    [ApiVersion("1.0")]
    public class CompaniesController(ICompaniesService companyService) : ControllerBase
    {
        private readonly ICompaniesService _companyService = companyService;
        [HttpGet("")]
        public async Task<PaginationResult<CompanyOveralDTO>> GetCompanies([FromQuery] CompaniesSearchCriteria criteria, CancellationToken cancellationToken)
        {
           return await _companyService.SearchCompanies(criteria, cancellationToken);
        }

        [HttpGet("{id}")]
        public async Task<CompanyDTO> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _companyService.GetByIdAsync(id, cancellationToken);
        }

        [HttpGet("{id}/contacts")]
        public async Task<PaginationResult<ContactDTO>> GetContacts(Guid id, [FromQuery] ContactSearchCriteria criteria, CancellationToken cancellationToken)
        {
            return await _companyService.SearchContacts(id, criteria, cancellationToken);
        }

    }
}
