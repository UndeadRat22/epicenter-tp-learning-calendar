using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Authentication.Invite
{
    public interface ICreateInvitationOperation
    {
        Task<CreateInvitationOperationResponse> Execute(CreateInvitationOperationRequest request);
    }

    public class CreateInvitationOperationRequest
    {
        public string InviteeEmail { get; set; }
    }

    public class CreateInvitationOperationResponse
    {

    }
}