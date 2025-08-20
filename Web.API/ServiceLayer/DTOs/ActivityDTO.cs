using ServiceLayer.Common;

namespace ServiceLayer.DTOs
{
    public class ActivityDTO
    {
        public Guid ActivityId { get; set; }
        public DateTime Date { get; set; }
        public ActivityTypesEnum? ActivityTypeId { get; set; }
        public string? ActivityType { get; set; }
        public string? Title { get; set; }
        public string? CustomerPersonName { get; set; }
        public string? AssignedName { get; set; }
        public string? Status { get; set; }
        public string? Note { get; set; }
    }
}
