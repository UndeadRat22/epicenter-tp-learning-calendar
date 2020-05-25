using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Limit;

namespace Epicenter.Service.Operations.Limit
{
    public class CreateGlobalLimitOperation : Operation, ICreateGlobalLimitOperation
    {
        private readonly ILimitRepository _limitRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAuthorizationContext _authorizationContext;

        public CreateGlobalLimitOperation(
            ILimitRepository limitRepository, 
            IAuthorizationContext authorizationContext, 
            IEmployeeRepository employeeRepository)
        {
            _limitRepository = limitRepository;
            _authorizationContext = authorizationContext;
            _employeeRepository = employeeRepository;
        }

        public async Task Execute(CreateGlobalLimitOperationRequest request)
        {
            var currentEmployee = await _authorizationContext.CurrentEmployee();
            if (!currentEmployee.IsTopLevelManager)
            {
                throw new ApplicationException("Cannot create a global limit, as you're not authorized to do so.");
            }

            var oldLimitsToDelete = await _limitRepository.ListAsync();
            var allEmployees = await _employeeRepository.ListAsync();

            var globalLimit = new Domain.Entity.LearningCalendar.Limit
            {
                Id = new Guid(),
                DaysPerQuarter = request.DaysPerQuarter
            };

            await _limitRepository.CreateAsync(globalLimit);

            foreach (var employee in allEmployees)
            {
                employee.LimitId = globalLimit.Id;
            }
            
            await _employeeRepository.UpdateAsync(allEmployees);

            await _limitRepository.DeleteAsync(oldLimitsToDelete);
        }
    }
}