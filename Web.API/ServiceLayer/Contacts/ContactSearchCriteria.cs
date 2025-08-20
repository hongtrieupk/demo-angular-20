using ServiceLayer.Common;

namespace ServiceLayer.Contacts
{
    public class ContactSearchCriteria : SearchCriteria
    {
        public Guid CompanyId { get; set; }
        public bool InactiveOnly { get; set; }
    }
}
