using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class Patient
    {
        [Key]

        public int AppointmentId { get; set; }
        public string? PatientName { get; set; }
        public string? PatientEmail { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }=string.Empty;
        public DateTime? Slot { get; set;}
        public string? Problem { get; set; }
    }
}
