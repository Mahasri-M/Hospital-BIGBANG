using Hospital.Models;

namespace Hospital.Repository.Interface
{
    public interface IApprove
    {
        IEnumerable<Approve> GetAllApproves();
        Approve GetApproveById(int User_Id);
        Task<List<Approve>?> DeleteApproveById(int id);
        Task<List<Approve>> AddUser(Approve user);
    }
}
