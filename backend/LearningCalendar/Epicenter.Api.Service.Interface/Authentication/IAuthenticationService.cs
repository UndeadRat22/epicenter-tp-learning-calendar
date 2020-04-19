using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResultDto> AuthenticateAsync(string email, string password);
        Task<RegistrationResultDto> RegisterAsync(string invitationId, string password);
    }
}