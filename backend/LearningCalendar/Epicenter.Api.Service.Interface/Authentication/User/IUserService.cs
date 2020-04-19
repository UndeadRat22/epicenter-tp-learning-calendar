using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication.User
{
    public interface IUserService
    {
        Task<bool> ExistsAsync(string email, string password);
        Task<bool> ExistsAsync(string email);
        Task<UserDto> CreateAsync(string email, string password);
    }
}