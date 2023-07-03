using Hospital.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Data
{
    public class HsptlContext:DbContext
    {
        public HsptlContext(DbContextOptions<HsptlContext> options):base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Approve> Approves { get; set; }
        public DbSet<Patient> Patients { get; set; }

        public DbSet<Specialization> Specializations { get; set; }

        public DbSet<Hospital.Models.Specialization> Specialization { get; set; } = default!;
    }
}
