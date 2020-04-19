using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.Authentication;
using Epicenter.Service.Interface.Authentication.User;
using Epicenter.Service.Interface.Employee;
using Epicenter.Service.Interface.Exceptions.Authentication;

namespace Epicenter.Service.Authentication
{
    public class RegisterUserOperation : IRegisterUserOperation
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly ICreateEmployeeOperation _createEmployeeOperation;

        public RegisterUserOperation(IInvitationRepository invitationRepository, ICreateEmployeeOperation employeeOperation)
        {
            _invitationRepository = invitationRepository;
            _createEmployeeOperation = employeeOperation;
        }

        public async Task<RegisterUserOperationResponse> Execute(RegisterUserOperationRequest request)
        {
            var existingInvitation = await _invitationRepository.GetWithInviterAsync(request.InvitationId);
            if (existingInvitation == null)
            {
                throw new InvitationDoesNotExistException(request.InvitationId);
            }

            var response = await _createEmployeeOperation.Execute(new CreateEmployeeOperationRequest
            {
                Email = existingInvitation.InvitationTo,
                ManagerEmail = existingInvitation.InvitationFrom.Email,
                Password = request.Password
            });

            await _invitationRepository.DeleteAsync(existingInvitation);

            return new RegisterUserOperationResponse();
        }
    }
}