

using System.ComponentModel;

namespace ServiceLayer.Common
{
    public enum ActivityTypesEnum
    {
        [Description("Call")]
        Call = 1,
        [Description("Meeting")]
        Meeting = 2,
        [Description("Task")]
        Task = 3,
        [Description("Email")]
        Email = 4,
        [Description("Call Not Answered")]
        Lunch = 5,
        [Description("Handover Meeting Sales Consutant")]
        HandoverMeetingSalesConsutant = 6,
        [Description("Handover Meeting Delivery Consultant")]
        HandoverMeetingDeliveryConsultant = 7,
        [Description("Operational Meeting")]
        OperationalMeeting = 8,
        [Description("Customer Development")]
        CustomerDevelopment = 10,
        [Description("Note")]
        Note = 11,
        [Description("Upload")]
        Upload = 22,
    }
}
