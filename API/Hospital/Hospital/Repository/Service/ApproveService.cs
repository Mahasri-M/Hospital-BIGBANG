using Hospital.Data;
using Hospital.Models;
using Hospital.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Repository.Service
{
    public class ApproveService:IApprove
    {
        private readonly HsptlContext _UserContext;
        public ApproveService(HsptlContext context)
        {
            _UserContext = context;
        }
     
        //GetAllUsers
        public IEnumerable<Approve> GetAllApproves()
        {
            return _UserContext.Approves.ToList();
        }
        //GetUserById
        public Approve GetApproveById(int User_Id)
        {
            return _UserContext.Approves.FirstOrDefault(x => x.Id == User_Id);
        }

        //PostUser
        public async Task<List<Approve>> AddUser(Approve user)
        {
            _UserContext.Approves.Add(user);
            await _UserContext.SaveChangesAsync();

            return await _UserContext.Approves.ToListAsync();
        }
        //Delete
        public async Task<List<Approve>?> DeleteApproveById(int id)
        {
            var users = await _UserContext.Approves.FindAsync(id);
            if (users is null)
            {
                return null;
            }
            _UserContext.Remove(users);
            await _UserContext.SaveChangesAsync();
            return await _UserContext.Approves.ToListAsync();
        }
    }
}
