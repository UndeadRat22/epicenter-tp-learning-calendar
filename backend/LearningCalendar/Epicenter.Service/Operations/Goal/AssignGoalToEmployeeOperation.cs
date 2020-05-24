using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class AssignGoalToEmployeeOperation : Operation, IAssignGoalToEmployeeOperation
    {
        private readonly IPersonalGoalRepository _personalGoalRepository;

        public AssignGoalToEmployeeOperation(IPersonalGoalRepository personalGoalRepository)
        {
            _personalGoalRepository = personalGoalRepository;
        }

        public async Task Execute(AssignGoalsToEmployeeOperationRequest request)
        {
            var existingGoals = await _personalGoalRepository
                .QueryAsync(goal =>
                    goal.EmployeeId == request.EmployeeId && request.TopicIds.Contains(goal.TopicId));

            if (existingGoals != null && existingGoals.Any())
            {
                throw new GoalAlreadyAssignedException(request.EmployeeId, existingGoals.First().TopicId);
            }

            var goals = request.TopicIds
                .Select(topicId => new PersonalGoal
                {
                    EmployeeId = request.EmployeeId,
                    TopicId = topicId
                }).ToList();

            await _personalGoalRepository.CreateAsync(goals);
        }
    }
}