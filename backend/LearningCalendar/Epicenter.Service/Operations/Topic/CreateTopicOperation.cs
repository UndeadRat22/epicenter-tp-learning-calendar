using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Topic;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Service.Operations.Topic
{
    public class CreateTopicOperation : ICreateTopicOperation
    {
        private readonly ITopicRepository _topicRepository;

        public CreateTopicOperation(ITopicRepository topicRepository)
        {
            _topicRepository = topicRepository;
        }

        public async Task<CreateTopicOperationResponse> Execute(CreateTopicOperationRequest request)
        {
            var topic = new Domain.Entity.LearningCalendar.Topic
            {
                Subject = request.Subject,
                Description = request.Description
            };

            try
            {
                await _topicRepository.CreateAsync(topic);
            }
            catch (DbUpdateException)
            {
                throw new TopicAlreadyExistsException(request.Subject);
            }

            if (request.ParentTopic.HasValue)
            {
                topic.ParentTopic = new Domain.Entity.LearningCalendar.Topic
                {
                    Id = request.ParentTopic.Value
                };
                try
                {
                    await _topicRepository.UpdateAsync(topic);
                }
                catch (DbUpdateException)
                {
                    await _topicRepository.DeleteAsync(topic);
                    throw new TopicDoesNotExistException(request.ParentTopic.Value);
                }
            }

            return new CreateTopicOperationResponse
            {
                Guid = topic.Id
            };
        }
    }
}