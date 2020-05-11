using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Service.Operations.Topic
{
    public class GetTopicTreeOperation : IGetTopicTreeOperation
    {
        private readonly ITopicRepository _topicRepository;

        public GetTopicTreeOperation(ITopicRepository topicRepository)
        {
            _topicRepository = topicRepository;
        }

        public async Task<GetTopicTreeOperationResponse> Execute()
        {
            var topics = await _topicRepository.ListAsync();

            var roots = topics
                .Where(topic => !topic.HasParent)
                .Select(MapTopic)
                .ToList();
                

            return new GetTopicTreeOperationResponse
            {
                Roots = roots
            };
        }

        private GetTopicTreeOperationResponse.Topic MapTopic(Domain.Entity.LearningCalendar.Topic topic)
        {
            return new GetTopicTreeOperationResponse.Topic
            {
                Children = topic.SubTopics?.Select(MapTopic).ToList() ?? new List<GetTopicTreeOperationResponse.Topic>(),
                Id = topic.Id,
                Subject = topic.Subject
            };
        }
    }
}