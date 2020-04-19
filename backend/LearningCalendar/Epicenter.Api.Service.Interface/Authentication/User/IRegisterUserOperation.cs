using System;
using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication.User
{
    public interface IRegisterUserOperation
    {
        Task<RegisterUserOperationResponse> Execute(RegisterUserOperationRequest request);
    }

    public class RegisterUserOperationRequest
    {
        public Guid InvitationId { get; set; }
        public string Password { get; set; }
    }

    public class RegisterUserOperationResponse
    {

    }
}