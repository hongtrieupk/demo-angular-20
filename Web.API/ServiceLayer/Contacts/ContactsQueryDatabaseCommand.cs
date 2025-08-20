using ServiceLayer.Common;
using ServiceLayer.Contacts;
using ServiceLayer.DTOs;

namespace ServiceLayer.Companies
{
    public class ContactsQueryDatabaseCommand : BaseQueryDatabaseCommand<ContactDTO>
    {
        public ContactSearchCriteria contactCriteria { get; set; }
        public ContactsQueryDatabaseCommand()
        {
            contactCriteria = new ContactSearchCriteria();
        }

        protected override IEnumerable<ContactDTO> BuildOrderCondition(IEnumerable<ContactDTO> data)
        {
            switch(contactCriteria.SortField)
            {
                case nameof(ContactDTO.FirstName):
                    data = criteria.SortDirection == SortDirection.Asc ? data.OrderBy(x => x.FirstName) : data.OrderByDescending(x => x.FirstName);
                    break;
                default:
                    break;
            }
            return data;
        }

        protected override IEnumerable<ContactDTO> BuildWhereCondition(IEnumerable<ContactDTO> data)
        {
            // skip filter by companyId- get mock data for demo purpose only
            if (contactCriteria.InactiveOnly)
            {
                data = data.Where(x => x.Active == false);
            }
            return data;
        }
    }
}