using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Topic;
using Microsoft.EntityFrameworkCore;

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
                    UpdatedTopic = MapTopic(topic)
                };
            }

            topic.ParentTopicId = request.NewTopic.ParentTopicId;
            topic.Description = request.NewTopic.Description;
            topic.Subject = request.NewTopic.Subject;

            try
            {
                await _topicRepository.UpdateAsync(topic);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                //optimistic locking
                return new UpdateTopicOperationResponse
                {
                    UpdatedTopic = MapTopic(topic)
                };
            }

            return new UpdateTopicOperationResponse();
        }

        private UpdateTopicOperationResponse.Topic MapTopic(Domain.Entity.LearningCalendar.Topic topic)
        {
            return new UpdateTopicOperationResponse.Topic
            {
                Id = topic.Id,
                ParentTopicId = topic.ParentTopicId,
                Subject = topic.Subject,
                Description = topic.Description
            };
        }
    }
}