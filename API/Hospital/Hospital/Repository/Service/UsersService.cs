using Hospital.Data;
using Hospital.Models;
using Hospital.Repository.Interface;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace Hospital.Repository.Service
{
    public class UsersService:IUser
    {
        private readonly HsptlContext _UserContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public UsersService(HsptlContext context, IWebHostEnvironment webHostEnvironment)
        {
            _UserContext = context;
            _webHostEnvironment = webHostEnvironment;
        }
        //GetAllUsers
        public IEnumerable<User> GetAllUsers()
        {
            return _UserContext.Users.ToList();
        }
        //GetUserById
        public User GetUserById(int User_Id)
        {
            return _UserContext.Users.FirstOrDefault(x => x.Id == User_Id);
        }

        //GetUserIdByEmail
        public User GetUserIdByEmail(string User_Email)
        {
            return _UserContext.Users.FirstOrDefault(x => x.Email == User_Email);
        }

        public async Task<User> CreateDoctor([FromForm] User doctor, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads/Doctor");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            doctor.Image = fileName;

            _UserContext.Users.Add(doctor);
            await _UserContext.SaveChangesAsync();

            return doctor;
        }

        //update

        //public async Task<User> UpdateDoctor(User doctor, IFormFile imageFile)
        //{
        //    // Retrieve the existing doctor from the database
        //    var existingDoctor = await _UserContext.Users.FindAsync(doctor.Id);

        //    if (existingDoctor == null)
        //    {
        //        throw new ArgumentException("Doctor not found");
        //    }

        //    // Update the properties of the existing doctor with the new values
        //    existingDoctor.Name = doctor.Name;
        //    existingDoctor.Email = doctor.Email;

        //    // Update the image if a new file is provided
        //    if (imageFile != null && imageFile.Length > 0)
        //    {
        //        var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads/Doctor");
        //        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
        //        var filePath = Path.Combine(uploadsFolder, fileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await imageFile.CopyToAsync(stream);
        //        }

        //        existingDoctor.Image = fileName;
        //    }

        //    // Save the changes to the database
        //    await _UserContext.SaveChangesAsync();

        //    return existingDoctor;
        //}


        ////PostUser
        //public async Task<List<User>> AddUser(User user)
        //{
        //    _UserContext.Users.Add(user);
        //    await _UserContext.SaveChangesAsync();

        //    return await _UserContext.Users.ToListAsync();
        //}

        //update
        public void UpdateUser(int id,User user)
        {
            var existingUser = _UserContext.Users.FirstOrDefault(u => u.Id==id);
            if (existingUser == null)
            {
                throw new ArgumentException($"User with ID {id} not found");
            }
            existingUser.Name=user.Name;
            existingUser.Email=user.Email;
            existingUser.Experience=user.Experience;
            existingUser.Degree=user.Degree;
            existingUser.Image=user.Image;

            _UserContext.SaveChanges();
        }

        //Delete
        public async Task<List<User>?> DeleteUserById(int id)
        {
            var users = await _UserContext.Users.FindAsync(id);
            if (users is null)
            {
                return null;
            }
            _UserContext.Remove(users);
            await _UserContext.SaveChangesAsync();
            return await _UserContext.Users.ToListAsync();
        }
        //Filtering doctors
        public IEnumerable<User> FilterDoctors()
        {
                List<User> users = _UserContext.Users.Where(x => x.Role== "Doctor").ToList();
                return users;
           
        }
        //Filtering users
        public IEnumerable<User> FilterUsers()
        {
            List<User> users = _UserContext.Users.Where(x => x.Role == "User").ToList();
            return users;

        }
        //Filtering specialization
        public IEnumerable<User> FilterSpecialization(string Specialization_name)
        {
            try
            {
                var query = _UserContext.Users.AsQueryable();

                if (!string.IsNullOrEmpty(Specialization_name))
                {
                    query = query.Where(h => h.Specialization_name.Contains(Specialization_name));
                }
                return query.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while filtering the Specialization_name.", ex);
            }
        }
    }
}
