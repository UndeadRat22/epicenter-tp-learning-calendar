using System.Linq;
using System.Threading.Tasks;
using Epicenter.Infrastructure.Extensions;
using Epicenter.Service.Interface.Operations.Topic;
using Epicenter.Service.Interface.Operations.Topic.Employee;

namespace Epicenter.Service.Operations.Topic.Employee
{
    public class GetSelfLearnedTopicsOperation : Operation, IGetSelfLearnedTopicsOperation
    {
        private readonly IGetPersonalTopicTreeOperation _getPersonalTopicTreeOperation;

        public GetSelfLearnedTopicsOperation(IGetPersonalTopicTreeOperation personalTopicTreeOperation)
        {
            _getPersonalTopicTreeOperation = personalTopicTreeOperation;
        }
        public async Task<GetTopicListOperationResponse> Execute()
        {
            var personalTree = await _getPersonalTopicTreeOperation.Execute();
            var learnedTopics = personalTree.Roots
                .SelectMany(root => root.Flatten(topic => topic.Children))
                .Where(topic => topic.Status == ProgressStatus.Learned);

            return new GetTopicListOperationResponse
            {
                Topics = learnedTopics
                    .Select(topic => new GetTopicListOperationResponse.Topic
                    {
                        Id = topic.Id,
                        Subject = topic.Subject,
                        Description = topic.Description
                    })
                    .ToList()
            };
        }
    }
}