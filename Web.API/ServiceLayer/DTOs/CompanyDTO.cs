namespace ServiceLayer.DTOs
{
    public class CompanyDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }

        public required string OrgNumber { get; set; }
        public required string ErpNumber { get; set; }
        public string? Email { get; set; }
        public string? Web { get; set; }
        public string? Comment { get; set; }
        public string? PrimaryResponsibleName { get; set; }
        public string? SecondaryResponsibleName { get; set; }
    }
}
