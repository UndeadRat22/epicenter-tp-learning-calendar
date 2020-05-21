using System;
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

        public FulfillPersonalGoalOperation(IAuthorizationContext authorizationContext,
            IPersonalGoalRepository personalGoalRepository)
        {
            _authorizationContext = authorizationContext;
            _personalGoalRepository = personalGoalRepository;
        }

        public async Task<FulfillPersonalGoalOperationResponse> Execute(FulfillPersonalGoalOperationRequest request)
        {
            var employee = await _authorizationContext.CurrentEmployee();

            PersonalGoal personalGoal;
            try
            {
                personalGoal = await _personalGoalRepository.QuerySingleAsync(goal =>
                    goal.EmployeeId == employee.Id && goal.TopicId == request.TopicId);
            }
            catch (EntityNotFoundException)
            {
                throw new GoalNotAssignedException(request.TopicId);
            }

            personalGoal.CompletionDate = DateTime.Today;
            await _personalGoalRepository.UpdateAsync(personalGoal);

            return new FulfillPersonalGoalOperationResponse();
        }
    }
}