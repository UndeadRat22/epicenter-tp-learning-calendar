using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class DeleteGoalsOperation : Operation, IDeleteGoalsOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IPersonalGoalRepository _personalGoalRepository;

        public DeleteGoalsOperation(IAuthorizationContext authorizationContext, IPersonalGoalRepository personalGoalRepository)
        {
            _authorizationContext = authorizationContext;
            _personalGoalRepository = personalGoalRepository;
        }

        public async Task Execute(DeleteGoalsOperationRequest request)
        {
            var currentEmployeeGoals = (await _authorizationContext.CurrentEmployee()).PersonalGoals;

            var goalsToDelete = currentEmployeeGoals
                .Where(goal => request.TopicIds.Contains(goal.TopicId) && !goal.CompletionDate.HasValue);

            await _personalGoalRepository.DeleteAsync(goalsToDelete);
        }
    }
}