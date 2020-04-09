using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResultDto> Authenticate(string email, string password);
        Task<RegistrationResultDto> CreateAuthIdentity(string email);
    }
}