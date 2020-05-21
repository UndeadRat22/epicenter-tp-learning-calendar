using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Topic;
using System.Threading.Tasks;
using Epicenter.Domain.Entity.LearningCalendar;
using Epicenter.Persistence.Interface.Exceptions;
using Epicenter.Service.Interface.Exceptions.Goal;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Goal;

namespace Epicenter.Service.Operations.Topic
{
    public class LearnTopicOperation : Operation, ILearnTopicOperation
    {
        private readonly ILearningDayTopicRepository _learningDayTopicRepository;
        private readonly IFulfillPersonalGoalOperation _fulfillPersonalGoalOperation;

        public LearnTopicOperation(ILearningDayTopicRepository learningDayTopicRepository,
            IFulfillPersonalGoalOperation fulfillPersonalGoalOperation)
        {
            _learningDayTopicRepository = learningDayTopicRepository;
            _fulfillPersonalGoalOperation = fulfillPersonalGoalOperation;
        }

        public async Task<LearnTopicOperationResponse> Execute(LearnTopicOperationRequest request)
        {
            LearningDayTopic learningDayTopic;
            try
            {
                learningDayTopic = await _learningDayTopicRepository.QuerySingleAsync(dayTopic =>
                    dayTopic.LearningDayId == request.LearningDayId && dayTopic.TopicId == request.TopicId);
            }
            catch (EntityNotFoundException)
            {
                throw new TopicNotInLearningDayException(request.TopicId);
            }

            if (learningDayTopic.ProgressStatus is ProgressStatus.Done)
                throw new TopicAlreadyLearnedException(request.TopicId);

            learningDayTopic.ProgressStatus = ProgressStatus.Done;
            await _learningDayTopicRepository.UpdateAsync(learningDayTopic);

            var fulfillGoalRequest = new FulfillPersonalGoalOperationRequest
            {
                TopicId = request.TopicId
            };

            try
            {
                await _fulfillPersonalGoalOperation.Execute(fulfillGoalRequest);
            }
            catch (GoalNotAssignedException)
            {
                // it's okay if no goal was assigned
                // do nothing in this case
            }

            return new LearnTopicOperationResponse();
        }
    }
}