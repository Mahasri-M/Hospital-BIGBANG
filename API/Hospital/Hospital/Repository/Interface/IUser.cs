using Hospital.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Repository.Interface
{
    public interface IUser
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int User_Id);
        User GetUserIdByEmail(string User_Email);
        Task<User> CreateDoctor([FromForm] User doctor, IFormFile imageFile);
        // Task<User> UpdateDoctor(User doctor, IFormFile imageFile);
        void UpdateUser(int id, User user);
        Task<List<User>?> DeleteUserById(int id);
        IEnumerable<User> FilterDoctors();
        IEnumerable<User> FilterUsers();
        IEnumerable<User> FilterSpecialization(string Specialization_name);
    }
}
