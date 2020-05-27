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
            var currentEmployee = await _authorizationContext.CurrentEmployee();
            var targetEmployee = currentEmployee.ManagedTeam.Employees
                .FirstOrDefault(employee => employee.Id == request.EmployeeId);

            if (targetEmployee == null)
            {
                throw new ApplicationException("You can only create limits for your direct subordinates");
            }

            var oldLimit = await _limitRepository.GetById(targetEmployee.LimitId);
            bool isOldLimitToBeDeleted = oldLimit.Employees.Count == 1;

            targetEmployee.Limit = new Domain.Entity.LearningCalendar.Limit
            {
                DaysPerQuarter = request.DaysPerQuarter
            };

            await _employeeRepository.UpdateAsync(targetEmployee);
            if (isOldLimitToBeDeleted)
            {
                oldLimit.Employees = new List<Domain.Entity.LearningCalendar.Employee>();
                await _limitRepository.UpdateAsync(oldLimit);
                await _limitRepository.DeleteAsync(oldLimit);
            }
        }
    }
}