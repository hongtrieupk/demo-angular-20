using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Companies;
using ServiceLayer.DTOs;

namespace Web.API.Controllers.v1
{
    [Route("api/v{version:apiVersion}/companies")]
    [ApiVersion("1.0")]
    public class CompaniesController(ICompaniesService companyService) : ControllerBase
    {
        private readonly ICompaniesService _companyService = companyService;
        [HttpGet("")]
        public async Task<IEnumerable<CompanyOveralDTO>> SearchCompany(CancellationToken cancellationToken)
        {
           return await _companyService.SearchCompany(cancellationToken);
        }
    }
}
