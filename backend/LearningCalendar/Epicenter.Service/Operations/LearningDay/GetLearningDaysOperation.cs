using System.Collections.Generic;
using System.Linq;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.LearningDay;
using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;

namespace Epicenter.Service.Operations.LearningDay
{
    public class GetLearningDaysOperation : Operation, IGetLearningDaysOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ILearningDayRepository _learningDayRepository;

        public GetLearningDaysOperation(IAuthorizationContext authorizationContext,
            ILearningDayRepository learningDayRepository)
        {
            _authorizationContext = authorizationContext;
            _learningDayRepository = learningDayRepository;
        }

        public async Task<GetLearningDaysOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var learningDays = await _learningDayRepository.GetByEmployeeIdAsync(employee.Id);

            var responseLearningDays = new List<GetLearningDaysOperationResponse.LearningDay>();

            foreach (var learningDay in learningDays)
            {
                var topics = learningDay.LearningDayTopics
                    .Select(learningDayTopic => new GetLearningDaysOperationResponse.LearningDay.LearningDayTopic
                    {
                        Id = learningDayTopic.TopicId,
                        Subject = learningDayTopic.Topic.Subject,
                        ProgressStatus = learningDayTopic.ProgressStatus
                    }).ToList();

                responseLearningDays.Add(new GetLearningDaysOperationResponse.LearningDay
                {
                    Id = learningDay.Id,
                    EmployeeId = employee.Id,
                    Date = learningDay.Date,
                    Comments = learningDay.Comments,
                    Topics = topics
                });
            }

            return new GetLearningDaysOperationResponse
            {
                LearningDays = responseLearningDays
            };
        }
    }
}