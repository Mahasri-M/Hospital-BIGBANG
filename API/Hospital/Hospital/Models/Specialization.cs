using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class Specialization
    {
        [Key]
        public string Specialization_name { get; set; } = string.Empty;
        // public string? imagepath { get; set; }

        public ICollection<User>? Users { get; set; }
    }
}
