using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Exceptions.Topic;
using Epicenter.Service.Interface.Operations.Topic;
using Microsoft.EntityFrameworkCore;

namespace Epicenter.Service.Operations.Topic
{
    public class CreateTopicOperation : Operation, ICreateTopicOperation
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
                ParentTopicId = request.ParentTopic,
                Subject = request.Subject,
                Description = request.Description,
            };

            try
            {
                await _topicRepository.CreateAsync(topic);
            }
            catch (DbUpdateException)
            {
                throw new TopicAlreadyExistsException(request.Subject);
            }
            return new CreateTopicOperationResponse
            {
                Id = topic.Id
            };
        }
    }
}