using Hospital.Data;
using Hospital.Models;
using Hospital.Repository.Interface;
using System.Diagnostics;

namespace Hospital.Repository.Service
{
    public class UserRepo : IBaseRepo<string, User>
    {
        private readonly HsptlContext _context;

        public UserRepo(HsptlContext context)
        {
            _context = context;
        }

        public User Add(User item)
        {
            try
            {
                _context.Users.Add(item);
                _context.SaveChanges();
                return item;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                Debug.WriteLine(item);
            }
            return null;
        }

        public User Get(string key)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == key);
            return user;
        }
        public User Update(User item)
        {
            try
            {
                _context.Users.Update(item);
                _context.SaveChanges();
                return item;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                Debug.WriteLine(item);
            }
            return null;
        }
    }
}
