using Hospital.Models;
using Hospital.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApproveController : ControllerBase
    {
        private readonly IApprove _user;
        public ApproveController(IApprove user)
        {
            _user = user;
        }
        [HttpGet]
        public IEnumerable<Approve> Get()
        {
            return _user.GetAllApproves();
        }
        [HttpGet("{id}")]
        public Approve GetById(int id)
        {
            return _user.GetApproveById(id);
        }

        [HttpPost]
        public async Task<ActionResult<List<Approve>>> AddUser(Approve user)
        {
            var users = await _user.AddUser(user);
            return Ok(users);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Approve>>> DeleteApproveById(int id)
        {
            var users = await _user.DeleteApproveById(id);
            if (users is null)
            {
                return NotFound("userid not matching");
            }
            return Ok(users);
        }
    }
}
