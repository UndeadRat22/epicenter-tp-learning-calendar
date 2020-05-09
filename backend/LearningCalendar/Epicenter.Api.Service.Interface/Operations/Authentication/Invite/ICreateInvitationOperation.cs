using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Authentication.Invite
{
    public interface ICreateInvitationOperation
    {
        Task<CreateInvitationOperationResponse> Execute(CreateInvitationOperationRequest request);
    }

    public class CreateInvitationOperationRequest
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
    }

    public class CreateInvitationOperationResponse
    {

    }
}