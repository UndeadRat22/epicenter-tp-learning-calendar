using System.Threading.Tasks;

namespace Epicenter.Service.Interface.Operations.Authentication.Invite
{
    public interface IDeleteInvitationsForEmailOperation
    {
        Task Execute(DeleteInvitationsForEmailOperationRequest request);
    }

    public class DeleteInvitationsForEmailOperationRequest
    {
        public string Email { get; set; }
    }
}