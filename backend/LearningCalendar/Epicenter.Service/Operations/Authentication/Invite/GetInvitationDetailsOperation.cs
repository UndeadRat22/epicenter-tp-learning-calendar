using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Authentication.Invite;

namespace Epicenter.Service.Operations.Authentication.Invite
{
    public class GetInvitationDetailsOperation : Operation, IGetInvitationDetailsOperation
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public GetInvitationDetailsOperation(
            IInvitationRepository invitationRepository, 
            IEmployeeRepository employeeRepository)
        {
            _invitationRepository = invitationRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<GetInvitationDetailsOperationResponse> Execute(GetInvitationDetailsOperationRequest request)
        {
            var invitation = await _invitationRepository.GetWithInviterAsync(request.Id);

            var inviter = await _employeeRepository.GetByIdentityIdAsync(invitation.InvitationFromId);

            return new GetInvitationDetailsOperationResponse
            {
                InvitationId = invitation.Id,
                InviterDetails = new GetInvitationDetailsOperationResponse.Details
                {
                    FirstName = inviter.FirstName,
                    LastName = inviter.LastName,
                    Email = invitation.InvitationFrom.Email,
                    Role = inviter.Role.Title
                },
                InviteeDetails = new GetInvitationDetailsOperationResponse.Details
                {
                    FirstName = invitation.FirstName,
                    LastName = invitation.LastName,
                    Email = invitation.InvitationTo,
                    Role = invitation.Role
                }
            };
        }
    }

}