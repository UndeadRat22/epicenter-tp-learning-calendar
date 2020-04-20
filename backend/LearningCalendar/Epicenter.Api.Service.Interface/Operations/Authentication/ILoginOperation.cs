using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Authentication
{
    public interface ILoginOperation
    {
        Task<LoginOperationResponse> Execute(LoginOperationRequest request);
    }

    public class LoginOperationRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginOperationResponse
    {
        public bool IsAuthenticated { get; set; }
        public string Token { get; set; }
    }
}