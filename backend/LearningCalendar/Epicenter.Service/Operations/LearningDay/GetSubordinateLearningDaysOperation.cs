using System.Collections.Generic;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.LearningDay;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Service.Context.Interface.Authorization;

namespace Epicenter.Service.Operations.LearningDay
{
    public class GetSubordinateLearningDaysOperation : Operation, IGetSubordinateLearningDaysOperation
    {
        private readonly IAuthorizationContext _authorizationContext;
        private readonly ILearningDayRepository _learningDayRepository;

        public GetSubordinateLearningDaysOperation(IAuthorizationContext authorizationContext,
            ILearningDayRepository learningDayRepository)
        {
            _authorizationContext = authorizationContext;
            _learningDayRepository = learningDayRepository;
        }

        public async Task<GetSubordinateLearningDaysOperationResponse> Execute()
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var learningDays = await _learningDayRepository.GetByManagerIdAsync(employee.Id);

            var responseLearningDays = new List<GetSubordinateLearningDaysOperationResponse.LearningDay>();

            foreach (var learningDay in learningDays)
            {
                var topics = learningDay.LearningDayTopics
                    .Select(learningDayTopic => new GetSubordinateLearningDaysOperationResponse.LearningDay.LearningDayTopic
                    {
                        Id = learningDayTopic.TopicId,
                        Subject = learningDayTopic.Topic.Subject,
                        ProgressStatus = learningDayTopic.ProgressStatus
                    }).ToList();

                responseLearningDays.Add(new GetSubordinateLearningDaysOperationResponse.LearningDay
                {
                    Id = learningDay.Id,
                    Employee = new GetSubordinateLearningDaysOperationResponse.Employee
                    {
                        Id = learningDay.Employee.Id,
                        Name = learningDay.Employee.FullName
                    },
                    Date = learningDay.Date,
                    Comments = learningDay.Comments,
                    Topics = topics
                });
            }

            return new GetSubordinateLearningDaysOperationResponse
            {
                LearningDays = responseLearningDays
            };
        }
    }
}