using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Goal;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;

namespace Epicenter.Service.Operations.Goal
{
    public class GetPersonalGoalsOperation : IGetPersonalGoalsOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly IPersonalGoalRepository _personalGoalRepository;

        public GetPersonalGoalsOperation(IAuthorizationContext authorizationContext,
            IPersonalGoalRepository personalGoalRepository)
        {
            _authorizationContext = authorizationContext;
            _personalGoalRepository = personalGoalRepository;
        }

        public async Task<GetPersonalGoalsOperationResponse> Execute()
        {
            var employee = await _authorizationContext.Current();
            var personalGoals = await _personalGoalRepository.GetByEmployeeIdAsync(employee.Id);
            
            return new GetPersonalGoalsOperationResponse
            {
                PersonalGoals = personalGoals.Select(personalGoal => new GetPersonalGoalsOperationResponse.PersonalGoal
                {
                    Id = personalGoal.Id,
                    CompletionDate = personalGoal.CompletionDate,
                    TopicId = personalGoal.TopicId
                }).ToList()
            };
        }
    }
}