using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
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
            if (request.EmployeeId == request.ManagerId)
            {
                throw new ApplicationException("An employee can't manage himself.");
            }

            bool isAuthorizedToReassign = await _authorizationContext.IsAuthorizedForEmployee(request.EmployeeId) &&
                                          await _authorizationContext.IsAuthorizedForEmployee(request.ManagerId);
            if (!isAuthorizedToReassign)
            {
                throw new ApplicationException($"Not authorized to reassign employee {request.EmployeeId}");
            }

            var employeeToAssign = await _employeeRepository.GetByIdAsync(request.EmployeeId);

            var myTeamTree = await _authorizationContext.GetTeamTree();
            var reassignedEmployeeTeamTree = myTeamTree
                .FindAnyOrDefault(
                    team => team.Employees.Select(employee => employee.ManagedTeam),
                    team => team.Manager.Id == employeeToAssign.Id);

            var subordinates = reassignedEmployeeTeamTree?.GetAllEmployees() ?? new List<Domain.Entity.LearningCalendar.Employee>();

            bool isNewManagerASubordinate = subordinates.Any(subordinate => subordinate.Id == request.ManagerId);

            if (isNewManagerASubordinate)
            {
                throw new ApplicationException("Can't reassign an employee to his subordinate");
            }

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