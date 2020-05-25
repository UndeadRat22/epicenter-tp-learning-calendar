using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Service.Operations.Topic
{
    public class UpdateTopicOperation : Operation, IUpdateTopicOperation
    {
        private readonly ITopicRepository _topicRepository;

        public UpdateTopicOperation(ITopicRepository topicRepository)
        {
            _topicRepository = topicRepository;
        }

        public async Task<UpdateTopicOperationResponse> Execute(UpdateTopicOperationRequest request)
        {
            var topic = await _topicRepository.QuerySingleAsync(t => t.Id == request.NewTopic.Id);

            if (topic == null)
            {
                throw new ApplicationException("Topic not found");
            }

            bool versionsMatch =
                   topic.Subject == request.OldTopic.Subject 
                && topic.Description == request.OldTopic.Description 
                && topic.ParentTopicId == request.OldTopic.ParentTopicId;

            if (!versionsMatch)
            {
                return new UpdateTopicOperationResponse
                {
                    UpdatedTopic = new UpdateTopicOperationResponse.Topic
                    {
                        Id = topic.Id,
                        ParentTopicId = topic.ParentTopicId,
                        Subject = topic.Subject,
                        Description = topic.Description
                    }
                };
            }

            topic.ParentTopicId = request.NewTopic.ParentTopicId;
            topic.Description = request.NewTopic.Description;
            topic.Subject = request.NewTopic.Subject;

            await _topicRepository.UpdateAsync(topic);

            return new UpdateTopicOperationResponse();
        }
    }
}