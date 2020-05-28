using System.Linq;
using System.Threading.Tasks;
using Epicenter.Persistence.Interface.Repository.LearningCalendar;
using Epicenter.Service.Interface.Operations.Topic;

namespace Epicenter.Service.Operations.Topic
{
    public class GetAllTopicsOperation : Operation, IGetAllTopicsOperation
    {
        private readonly ITopicRepository _topicRepository;

        public GetAllTopicsOperation(ITopicRepository topicRepository)
        {
            _topicRepository = topicRepository;
        }

        public async Task<GetTopicListOperationResponse> Execute()
        {
            var topics = await _topicRepository.ListAsync();
            return new GetTopicListOperationResponse
            {
                Topics = topics.Select(topic => new GetTopicListOperationResponse.Topic
                {
                    Id = topic.Id,
                    Subject = topic.Subject,
                    Description = topic.Description
                }).ToList()
            };
        }
    }
}