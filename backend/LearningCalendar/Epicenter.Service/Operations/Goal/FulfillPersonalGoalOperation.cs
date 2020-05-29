using System;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Exceptions;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Goal;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class FulfillPersonalGoalOperation : Operation, IFulfillPersonalGoalOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IPersonalGoalRepository _personalGoalRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public FulfillPersonalGoalOperation(
            IAuthorizationContext authorizationContext,
            IPersonalGoalRepository personalGoalRepository, 
            IEmployeeRepository employeeRepository)
        {
            _authorizationContext = authorizationContext;
            _personalGoalRepository = personalGoalRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task Execute(FulfillPersonalGoalOperationRequest request)
        {
            var employee = await _authorizationContext.CurrentEmployee();

            var personalGoal = employee.PersonalGoals
                .FirstOrDefault(goal => goal.TopicId == request.TopicId && goal.CompletionDate == null);
            if (personalGoal == null)
            {
                throw new ApplicationException($"Goal for topic {request.TopicId} not found");
            }

            personalGoal.CompletionDate = DateTime.Today;

            await _employeeRepository.UpdateAsync(employee);
        }
    }
}