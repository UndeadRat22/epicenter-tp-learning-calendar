using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.Invite;

namespace Epicenter.Service.Operations.Authentication.Invite
{
    public class GetInvitationDetailsOperation : IGetInvitationDetailsOperation
    {
        private readonly IInvitationRepository _invitationRepository;

        public GetInvitationDetailsOperation(IInvitationRepository invitationRepository)
        {
            _invitationRepository = invitationRepository;
        }

        public async Task<GetInvitationDetailsOperationResponse> Execute(GetInvitationDetailsOperationRequest request)
        {

            var invitation = await _invitationRepository.GetWithInviterAsync(request.Id);

            return new GetInvitationDetailsOperationResponse
            {
                InvitationId = invitation.Id,
                InvitationTo = invitation.InvitationTo,
                InvitationFrom = invitation.InvitationFrom.Email
            };
        }
    }

}