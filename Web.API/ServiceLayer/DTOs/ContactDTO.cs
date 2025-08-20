namespace ServiceLayer.DTOs
{
    public class ContactDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Title { get; set; }
        public string? Email { get; set; }
        public string? Tags { get; set; }
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public string? LastActivity { get; set; }
        public bool SmsAlert { get; set; }
        public bool InfoEmail { get; set; }
        public bool Active { get; set; }
    }
}
