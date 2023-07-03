using Hospital.Models.DTO;

namespace Hospital.Repository.Interface
{
    public interface ITokenGenerate
    {
        public string GenerateToken(UserDTO user);
    }
}
