using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Goal
{
    public class GetEmployeeGoalsOperation : Operation, IGetEmployeeGoalsOperation
    {
        private readonly IPersonalGoalRepository _personalGoalRepository;

        public GetEmployeeGoalsOperation(IPersonalGoalRepository personalGoalRepository)
        {
            _personalGoalRepository = personalGoalRepository;
        }
        public async Task<GetEmployeeGoalsOperationResponse> Execute(GetEmployeeGoalsOperationRequest request)
        {
            var personalGoals = await _personalGoalRepository.GetByEmployeeIdAsync(request.EmployeeId);

            return new GetEmployeeGoalsOperationResponse
            {
                PersonalGoals = personalGoals.Select(personalGoal => new GetEmployeeGoalsOperationResponse.PersonalGoal
                {
                    Id = personalGoal.Id,
                    CompletionDate = personalGoal.CompletionDate,
                    Topic = new GetEmployeeGoalsOperationResponse.Topic
                    {
                        Id = personalGoal.Topic.Id,
                        Subject = personalGoal.Topic.Subject,
                        Description = personalGoal.Topic.Description,
                    }
                }).ToList()
            };
        }
    }
}