using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class Approve
    {
        [Key]

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string Role { get; set; } = string.Empty;
        public string? PasswordClear { get; set; }
        public string Specialization_name { get; set; } = string.Empty;
        public string? Experience { get; set; }
        public string? Degree { get; set; }


    }
}
