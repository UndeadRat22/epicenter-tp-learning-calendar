using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication.User
{
    public interface IUserService
    {
        Task<bool> Exists(string email, string password);
        Task<bool> Exists(string email);
        Task<UserDto> Create(string email, string password);
    }
}