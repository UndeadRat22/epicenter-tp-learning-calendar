using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Authentication.Invite;
using Epicenter.Service.Interface.Operations.Authentication.User;
using Epicenter.Service.Interface.Operations.Employee;

namespace Epicenter.Service.Operations.Authentication
{
    public class RegisterUserOperation : IRegisterUserOperation
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly ICreateEmployeeOperation _createEmployeeOperation;
        private readonly IDeleteInvitationsForEmailOperation _deleteInvitationsForEmailOperation;


        public RegisterUserOperation(IInvitationRepository invitationRepository, ICreateEmployeeOperation employeeOperation, IDeleteInvitationsForEmailOperation deleteInvitationsForEmailOperation)
        {
            _invitationRepository = invitationRepository;
            _createEmployeeOperation = employeeOperation;
            _deleteInvitationsForEmailOperation = deleteInvitationsForEmailOperation;
        }

        public async Task<RegisterUserOperationResponse> Execute(RegisterUserOperationRequest request)
        {
            var invitation = await _invitationRepository.GetWithInviterAsync(request.InviteId)
                ?? throw new InvitationDoesNotExistException(request.InviteId);

            var response = await _createEmployeeOperation.Execute(new CreateEmployeeOperationRequest
            {
                Email = invitation.InvitationTo,
                ManagerEmail = invitation.InvitationFrom.Email,
                FirstName = invitation.FirstName,
                LastName = invitation.LastName,
                Role = invitation.Role,
                Password = request.Password,
                ImageData = request.ImageData
            });

            var deleteInvitationsRequest = new DeleteInvitationsForEmailOperationRequest
            {
                Email = invitation.InvitationTo
            };
            await _deleteInvitationsForEmailOperation.Execute(deleteInvitationsRequest);

            return new RegisterUserOperationResponse();
        }
    }
}