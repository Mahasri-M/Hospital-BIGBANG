using Hospital.Data;
using Hospital.Models;
using Hospital.Repository.Interface;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Repository.Service
{
    public class PatientServices:IPatient
    {
        private readonly HsptlContext _UserContext;

        public PatientServices(HsptlContext context)
        {
            _UserContext = context;
        }
        //GetAllPatient
        public IEnumerable<Patient> GetAllPatients()
        {
            return _UserContext.Patients.ToList();
        }
        //GetPatientById
        public Patient GetPatientById(int User_Id)
        {
            return _UserContext.Patients.FirstOrDefault(x => x.AppointmentId == User_Id);
        }
        ////PostPatient
        public async Task<List<Patient>> Addpatient(Patient user)
        {
            _UserContext.Patients.Add(user);
            await _UserContext.SaveChangesAsync();

            return await _UserContext.Patients.ToListAsync();
        }

        //Delete
        public async Task<List<Patient>?> DeletePatientById(int id)
        {
            var users = await _UserContext.Patients.FindAsync(id);
            if (users is null)
            {
                return null;
            }
            _UserContext.Remove(users);
            await _UserContext.SaveChangesAsync();
            return await _UserContext.Patients.ToListAsync();
        }
    }
}
