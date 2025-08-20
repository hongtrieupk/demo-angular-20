using ServiceLayer.Common;
using ServiceLayer.Contacts;
using ServiceLayer.DTOs;

namespace ServiceLayer.Activities
{
    public class ActivitiesQueryDatabaseCommand : BaseQueryDatabaseCommand<ActivityDTO>
    {
        public ActivitiesSearchCriteria activitiesCriteria { get; set; }
        public ActivitiesQueryDatabaseCommand()
        {
            activitiesCriteria = new ActivitiesSearchCriteria();
        }

        protected override IEnumerable<ActivityDTO> BuildOrderCondition(IEnumerable<ActivityDTO> data)
        {
            switch (activitiesCriteria.SortField)
            {
                case nameof(ActivityDTO.Date):
                    data = criteria.SortDirection == SortDirection.Asc ? data.OrderBy(x => x.Date) : data.OrderByDescending(x => x.Date);
                    break;
                default:
                    break;
            }
            return data;
        }

        protected override IEnumerable<ActivityDTO> BuildWhereCondition(IEnumerable<ActivityDTO> data)
        {
            // skip filter by companyId - get mock data for demo purpose only
            if (!activitiesCriteria.isShowAll)
            {
                var thisYear = DateTime.Now.Year;
                data = data.Where(x => x.Date.Year == thisYear);
            }
            return data;
        }
    }
}
