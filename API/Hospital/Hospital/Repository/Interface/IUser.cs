using Hospital.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Repository.Interface
{
    public interface IUser
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int User_Id);
        Task<User> CreateDoctor([FromForm] User doctor, IFormFile imageFile);
        Task<User> UpdateDoctor(User doctor, IFormFile imageFile);
        Task<List<User>?> DeleteUserById(int id);
        IEnumerable<User> FilterDoctors();
        IEnumerable<User> FilterUsers();
        IEnumerable<User> FilterSpecialization(string Specialization_name);
    }
}
