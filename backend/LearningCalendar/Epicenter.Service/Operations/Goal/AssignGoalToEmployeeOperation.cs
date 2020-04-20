using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Authentication;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class AssignGoalToEmployeeOperation : IAssignGoalToEmployeeOperation
    {
        private readonly IPersonalGoalRepository _personalGoalRepository;

        public AssignGoalToEmployeeOperation(IPersonalGoalRepository personalGoalRepository)
        {
            _personalGoalRepository = personalGoalRepository;
        }

        public async Task<AssignGoalToEmployeeOperationResponse> Execute(AssignGoalToEmployeeOperationRequest request)
        {
            var existingGoal = await _personalGoalRepository
                .QuerySingleOrDefaultAsync(goal =>
                    goal.EmployeeId == request.EmployeeId && goal.TopicId == request.TopicId);

            if (existingGoal != null)
            {
                throw new GoalAlreadyAssignedException(request.EmployeeId, request.TopicId);
            }

            var goal = new PersonalGoal
            {
                EmployeeId = request.EmployeeId,
                TopicId = request.TopicId
            };

            await _personalGoalRepository.CreateAsync(goal);

            return new AssignGoalToEmployeeOperationResponse
            {

            };
        }
    }
}