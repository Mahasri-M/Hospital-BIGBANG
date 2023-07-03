using Hospital.Models;
using Hospital.Models.DTO;
using Hospital.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Hospital.Repository.Service
{
    public class UserService
    {
        private IBaseRepo<string, User> _repo;
        private ITokenGenerate _tokenService;

        public UserService(IBaseRepo<string, User> repo, ITokenGenerate tokenGenerate)
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

        public UserDTO UpdateUser(UserDTO userDTO)
        {
            UserDTO user = null;
            var userData = _repo.Get(userDTO.Email);
            if (userData != null)
            {
                if (!string.IsNullOrEmpty(userDTO.Password))
                {
                    // Update the password if a new password is provided
                    var hmac = new HMACSHA512();
                    userData.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                    userData.HashKey = hmac.Key;
                }

                // Update other user properties as needed
                userData.Name = userDTO.Name;
                // Update other properties as needed
                // ...

                // Save the changes
                _repo.Update(userData);

                user = new UserDTO();
                user.Email = userData.Email;
                user.Role = userData.Role;
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }


    }
}
