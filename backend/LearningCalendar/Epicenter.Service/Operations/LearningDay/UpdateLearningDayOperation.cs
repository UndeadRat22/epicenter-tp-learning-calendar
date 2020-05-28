using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Context.Interface.Authorization;
using Epicenter.Service.Interface.Exceptions.Limit;
using Epicenter.Service.Interface.Operations.LearningDay;

namespace Epicenter.Service.Operations.LearningDay
{
    public class UpdateLearningDayOperation : Operation, IUpdateLearningDayOperation
    {
        private readonly ILearningDayRepository _learningDayRepository;
        private readonly IAuthorizationContext _authorizationContext;

        public UpdateLearningDayOperation(
            ILearningDayRepository learningDayRepository, 
            IAuthorizationContext authorizationContext)
        {
            _learningDayRepository = learningDayRepository;
            _authorizationContext = authorizationContext;
        }

        public async Task Execute(UpdateLearningDayOperationRequest request)
        {
            var employee = await _authorizationContext.CurrentEmployee();
            var learningDay = await _learningDayRepository.GetByIdAsync(request.LearningDayId)
                ?? throw new ApplicationException("Learning day not found");

            List<(LearningDayTopic topic, UpdateLearningDayOperationRequest.LearningDayTopic requestTopic)> 
                topicsWithRequestTopic = learningDay.LearningDayTopics
                .Select(topic => (topic,
                    request.LearningDayTopics.FirstOrDefault(dayTopic => dayTopic.Id == request.LearningDayId)))
                .ToList();

            var stillExistingTopics = topicsWithRequestTopic
                .Where(topicGroup => topicGroup.requestTopic != null)
                .ToList();

            var newTopics = request.LearningDayTopics
                .Where(dayTopic => dayTopic.Id == null)
                .Select(dayTopic => new LearningDayTopic
                {
                    LearningDayId = learningDay.Id,
                    ProgressStatus = MapProgressStatus(dayTopic),
                    TopicId = dayTopic.TopicId
                });


            learningDay.LearningDayTopics = stillExistingTopics
                .Select(group => group.topic)
                .Concat(newTopics)
                .ToList();

            foreach (var (topic, requestTopic) in stillExistingTopics)
            {
                topic.ProgressStatus = MapProgressStatus(requestTopic);
                topic.TopicId = requestTopic.TopicId;
            }

            if (learningDay.LearningDayTopics.Count > Constants.Limit.MaxTopicsPerDay)
            {
                throw new LimitExceededException(nameof(Constants.Limit.MaxTopicsPerDay));
            }

            learningDay.Comments = request.Comments;
            learningDay.Date = request.Date;

            await _learningDayRepository.UpdateAsync(learningDay);
        }

        private ProgressStatus MapProgressStatus(UpdateLearningDayOperationRequest.LearningDayTopic learningDayTopic)
        {
            return learningDayTopic.ProgressStatus switch
            {
                UpdateLearningDayOperationRequest.ProgressStatus.InProgress => ProgressStatus.InProgress,
                UpdateLearningDayOperationRequest.ProgressStatus.Done => ProgressStatus.Done,
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
}