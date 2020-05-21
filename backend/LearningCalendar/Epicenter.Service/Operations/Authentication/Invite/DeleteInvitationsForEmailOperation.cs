using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.Invite;

namespace Epicenter.Service.Operations.Authentication.Invite
{
    public class DeleteInvitationsForEmailOperation : Operation, IDeleteInvitationsForEmailOperation
    {
        private readonly IInvitationRepository _invitationRepository;

        public DeleteInvitationsForEmailOperation(IInvitationRepository invitationRepository)
        {
            _invitationRepository = invitationRepository;
        }

        public async Task Execute(DeleteInvitationsForEmailOperationRequest request)
        {
            var invites = await _invitationRepository.QueryAsync(invite => invite.InvitationTo == request.Email);

            await _invitationRepository.DeleteAsync(invites);
        }
    }
}