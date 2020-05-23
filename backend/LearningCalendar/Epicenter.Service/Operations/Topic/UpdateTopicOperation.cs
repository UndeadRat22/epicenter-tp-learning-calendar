using System;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
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

        public async Task Execute(UpdateTopicOperationRequest request)
        {
            var topic = await _topicRepository.QuerySingleAsync(t => t.Id == request.Id);
            if (topic == null)
            {
                throw new ApplicationException("Topic not found");
            }
            topic.ParentTopicId = request.ParentTopicId;
            topic.Description = request.Description;
            topic.Subject = request.Subject;

            await _topicRepository.UpdateAsync(topic);
        }
    }
}