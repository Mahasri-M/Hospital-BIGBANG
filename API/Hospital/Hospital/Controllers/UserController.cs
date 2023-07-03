using Hospital.Models;
using Hospital.Models.DTO;
using Hospital.Repository.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AngularCORS")]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;
        public UserController(UserService service)
        {
            _service = service;
        }

        [HttpPost("Register")]
        public ActionResult<UserDTO> Register([FromBody] UserRegisterDTO userDTO)
        {
            var user = _service.Register(userDTO);
            if (user == null)
            {
                return BadRequest("Unable to register");
            }
            return Created("Home", user);
        }

        [HttpPost("Login")]
        public ActionResult<UserDTO> Login([FromBody] UserDTO userDTO)
        {
            var user = _service.Login(userDTO);
            if (user == null)
            {
                return BadRequest("Invalid username or password");
            }
            return Ok(user);
        }
        [HttpPost("users/{userId}")]
        public IActionResult UpdateUser(int userId, [FromBody] UserUpdateDTO updateUserDTO)
        {
            UserDTO updatedUser = _service.UpdateUser(userId, updateUserDTO);
            if (updatedUser == null)
            {
                return BadRequest("Failed to update user.");
            }

            return Ok(updatedUser);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Put(int id, [FromForm] User doctor, IFormFile imageFile)
        {
            try
            {
                doctor.Id = id;
                var updatedDoctor = await _service.UpdateDoctor(doctor, imageFile);
                return Ok(updatedDoctor);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

    }
}
