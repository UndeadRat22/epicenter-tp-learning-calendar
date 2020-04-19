using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Authentication.Invite
{
    public interface ICreateInvitationOperation
    {
        Task<CreateInvitationOperationResponse> Execute(CreateInvitationOperationRequest request);
    }

    public class CreateInvitationOperationRequest
    {
        public string InviterEmail { get; set; }
        public string InviteeEmail { get; set; }
    }

    public class CreateInvitationOperationResponse
    {

    }
}