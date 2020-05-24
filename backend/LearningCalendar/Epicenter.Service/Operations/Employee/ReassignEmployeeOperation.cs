using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Employee;

namespace Epicenter.Service.Operations.Employee
{
    public class ReassignEmployeeOperation : Operation, IReassignEmployeeOperation
    {
        private readonly IEnsureManagerHasTeamOperation _ensureManagerHasTeamOperation;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IEmployeeRepository _employeeRepository;

        public ReassignEmployeeOperation(
            IEnsureManagerHasTeamOperation ensureManagerHasTeamOperation,
            IAuthorizationContext authorizationContext, 
            IEmployeeRepository employeeRepository)
        {
            _ensureManagerHasTeamOperation = ensureManagerHasTeamOperation;
            _authorizationContext = authorizationContext;
            _employeeRepository = employeeRepository;
        }

        public async Task Execute(ReassignEmployeeOperationRequest request)
        {
            bool isAuthorizedToReassign = await _authorizationContext.IsAuthorizedForEmployee(request.EmployeeId) &&
                                          await _authorizationContext.IsAuthorizedForEmployee(request.ManagerId);
            if (!isAuthorizedToReassign)
            {
                throw new ApplicationException($"Not authorized to reassign employee {request.EmployeeId}");
            }

            var employeeToAssign = await _employeeRepository.GetByIdAsync(request.EmployeeId);

            var ensureNewManagerHasTeamRequest = new EnsureManagerHasTeamRequest
            {
                ManagerId = request.ManagerId
            };
            await _ensureManagerHasTeamOperation.Execute(ensureNewManagerHasTeamRequest);
            
            var newManager = await _employeeRepository.GetByIdAsync(request.ManagerId);

            employeeToAssign.Team = newManager.ManagedTeam;

            await _employeeRepository.UpdateAsync(employeeToAssign);
        }
    }
}