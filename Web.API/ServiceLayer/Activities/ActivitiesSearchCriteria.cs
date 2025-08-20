using ServiceLayer.Common;

namespace ServiceLayer.Activities
{
    public class ActivitiesSearchCriteria : SearchCriteria
    {
        public Guid CompanyId { get; set; }
        public bool isShowAll { get; set; }
    }
}
