using Hospital.Models;
using Hospital.Models.DTO;
using Hospital.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Hospital.Models.DTO;
using Microsoft.AspNetCore.Hosting;
using Hospital.Data;

namespace Hospital.Repository.Service
{
    public class UserService
    {
        private IBaseRepo<string, User> _repo;
        private ITokenGenerate _tokenService;
        private readonly HsptlContext _UserContext;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UserService(IBaseRepo<string, User> repo, ITokenGenerate tokenGenerate, HsptlContext context, IWebHostEnvironment webHostEnvironment)
        {
            _repo = repo;
            _tokenService = tokenGenerate;
        }

        public UserDTO Login(UserDTO userDTO)
        {
            UserDTO user = null;
            var userData = _repo.Get(userDTO.Email);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.HashKey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.Password[i])
                        return null;
                }
                user = new UserDTO();
                user.Email = userData.Email;
                user.Role = userData.Role;
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }


        public UserDTO Register(UserRegisterDTO userDTO)
        {
            UserDTO user = null;
            var hmac = new HMACSHA512();
            userDTO.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.PasswordClear));
            userDTO.HashKey = hmac.Key;
            var resultUser = _repo.Add(userDTO);
            if (resultUser != null)
            {
                user = new UserDTO();
                user.Name = resultUser.Name;
                user.Email = resultUser.Email;
                user.Role = resultUser.Role;
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }

        public UserDTO UpdateUser(int userId, UserUpdateDTO updateUserDTO)
        {
            UserDTO user = null;
            var userData = _repo.Get(userId.ToString());
            if (userData != null)
            {
                if (!string.IsNullOrEmpty(updateUserDTO.Name))
                {
                    userData.Name = updateUserDTO.Name;
                }
                if (!string.IsNullOrEmpty(updateUserDTO.Experience))
                {
                    userData.Experience = updateUserDTO.Experience;
                }
                if (!string.IsNullOrEmpty(updateUserDTO.Degree))
                {
                    userData.Degree = updateUserDTO.Degree;
                }
                if (!string.IsNullOrEmpty(updateUserDTO.Specialization_name))
                {
                    userData.Specialization_name = updateUserDTO.Specialization_name;
                }

                _repo.Update(userData);

                user = new UserDTO();
                user.Email = userData.Email;
                user.Role = userData.Role;
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }
        //update

        public async Task<User> UpdateDoctor(User doctor, IFormFile imageFile)
        {
            // Retrieve the existing doctor from the database
            var existingDoctor = await _UserContext.Users.FindAsync(doctor.Id);

            if (existingDoctor == null)
            {
                throw new ArgumentException("Doctor not found");
            }

            // Update the properties of the existing doctor with the new values
            existingDoctor.Name = doctor.Name;
            existingDoctor.Email = doctor.Email;

            // Update the image if a new file is provided
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads/Doctor");
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                existingDoctor.Image = fileName;
            }

            // Save the changes to the database
            await _UserContext.SaveChangesAsync();

            return existingDoctor;
        }



    }
}
