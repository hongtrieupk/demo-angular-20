namespace ServiceLayer.DTOs
{
    public class CompanyOveralDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string OrgNumber { get; set; }
        public string? Web { get; set; }
    }
}
