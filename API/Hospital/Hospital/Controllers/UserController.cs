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
        [HttpPut("{email}")]
        public ActionResult<UserDTO> UpdateUser(string email, [FromBody] UserDTO userDTO)
        {
            if (email != userDTO.Email)
            {
                return BadRequest("Invalid email address");
            }

            var user = _service.UpdateUser(userDTO);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }


    }
}
