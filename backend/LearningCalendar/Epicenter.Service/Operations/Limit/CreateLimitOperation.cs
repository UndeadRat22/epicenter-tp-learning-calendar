using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Limit;

namespace Epicenter.Service.Operations.Limit
{
    public class CreateLimitOperation : Operation, ICreateLimitOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ILimitRepository _limitRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public CreateLimitOperation(
            IAuthorizationContext authorizationContext, 
            ILimitRepository limitRepository, 
            IEmployeeRepository employeeRepository)
        {
            _authorizationContext = authorizationContext;
            _limitRepository = limitRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task Execute(CreateLimitOperationRequest request)
        {
            var targetEmployee = (await _authorizationContext.CurrentEmployee())
                .ManagedTeam.Employees
                .FirstOrDefault(employee => employee.Id == request.EmployeeId);

            if (targetEmployee == null)
            {
                throw new ApplicationException("You can only create limits for your direct subordinates");
            }

            targetEmployee = await _employeeRepository.QuerySingleAsync(employee => employee.Id == request.EmployeeId);

            targetEmployee.Limit = new Domain.Entity.LearningCalendar.Limit
            {
                DaysPerQuarter = request.DaysPerQuarter
            };

            await _employeeRepository.UpdateAsync(targetEmployee);
            var nonAssignedLimits = await _limitRepository.GetNonAssignedLimitsAsync();
            await _limitRepository.DeleteAsync(nonAssignedLimits);
        }
    }
}