using Hospital.Models;
using Hospital.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUser _user;
        public UsersController(IUser user)
        {
            _user = user;
        }
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _user.GetAllUsers();
        }
        [HttpGet("{id}")]
        public User GetById(int id)
        {
            return _user.GetUserById(id);
        }
        //[HttpPost]
        //public async Task<ActionResult<List<User>>> AddUser(User user)
        //{
        //    var users = await _user.AddUser(user);
        //    return Ok(users);
        //}
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromForm] User doctor, IFormFile imageFile)
        {

            try
            {
                var createdDoctor = await _user.CreateDoctor(doctor, imageFile);
                return CreatedAtAction("Get", new { id = createdDoctor.Id }, createdDoctor);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Put(int id, [FromForm] User doctor, IFormFile imageFile)
        {
            try
            {
                doctor.Id = id;
                var updatedDoctor = await _user.UpdateDoctor(doctor, imageFile);
                return Ok(updatedDoctor);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUserById(int id)
        {
            var users = await _user.DeleteUserById(id);
            if (users is null)
            {
                return NotFound("userid not matching");
            }
            return Ok(users);
        }

        //doctor
        [HttpGet("filteringdoctors")]
        public IEnumerable<User> FilterDoctor()
        {
            return _user.FilterDoctors();
        }

        //user
        [HttpGet("filteringpatient")]
        public IEnumerable<User> FilterUser()
        {
            return _user.FilterUsers();
        }

        // Specialization_name
        [HttpGet("filteringspecialization")]

        public IEnumerable<User> Filterspecialization(string Specialization_name)
        {
            return _user.FilterSpecialization(Specialization_name);
                
        }
    }
}
