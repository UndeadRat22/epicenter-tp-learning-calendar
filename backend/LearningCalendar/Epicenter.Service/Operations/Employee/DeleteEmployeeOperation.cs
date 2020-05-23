using System;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Persistence.Interface.Repository.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Employee;
using Epicenter.Service.Interface.Operations.Employee;
using Microsoft.AspNetCore.Identity;

namespace Epicenter.Service.Operations.Employee
{
    public class DeleteEmployeeOperation : Operation, IDeleteEmployeeOperation
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IRepository<IdentityUser> _userRepository;

        public DeleteEmployeeOperation(
            IEmployeeRepository employeeRepository, 
            IAuthorizationContext authorizationContext, 
            ITeamRepository teamRepository, 
            IRepository<IdentityUser> userRepository)
        {
            _employeeRepository = employeeRepository;
            _authorizationContext = authorizationContext;
            _teamRepository = teamRepository;
            _userRepository = userRepository;
        }

        public async Task Execute(DeleteEmployeeOperationRequest request)
        {
            var targetEmployee = await _employeeRepository.GetByIdAsync(request.EmployeeId);
            bool targetEmployeeHasNoSubordinates =
                targetEmployee.ManagedTeam == null || !targetEmployee.ManagedTeam.Employees.Any();
            if (!targetEmployeeHasNoSubordinates)
            {
                throw new EmployeeHasSubordinatesException(request.EmployeeId);
            }

            var isAuthorizedToDelete = (await _authorizationContext.GetTeamTree())
                .Flatten(team => team.Employees.Select(employee => employee.ManagedTeam))
                .SelectMany(team => team?.Employees)
                .Where(employee => employee != null)
                .Any(employee => employee.Id == request.EmployeeId);

            if (!isAuthorizedToDelete)
            {
                throw new ApplicationException($"Not authorized to delete {targetEmployee.Id}");
            }

            await _employeeRepository.DeleteAsync(targetEmployee);
            await _userRepository.DeleteAsync(targetEmployee.Identity);
        }
    }
}