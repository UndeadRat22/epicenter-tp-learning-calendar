using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Authentication.User
{
    public interface ICheckUserCredentialsOperation
    {
        Task<CheckUserCredentialsOperationResponse> Execute(CheckUserCredentialsOperationRequest request);
    }

    public class CheckUserCredentialsOperationRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class CheckUserCredentialsOperationResponse
    {
        public bool IsCorrect { get; set; }
    }
}